'use strict';

import { Log } from '../../utils/logger.js';

/**
 *
 */
export function hook_art_method() {
  Process.getModuleByName('libart.so').enumerateSymbols().forEach(symbol => {
    const symbol_name = symbol.name;
    const indexArtMethod = symbol_name.includes('ArtMethod');
    const indexInvoke = symbol_name.includes('Invoke');
    const indexThread = symbol_name.includes('Thread');
    if (indexArtMethod
      && indexInvoke
      && indexThread
      && indexArtMethod < indexInvoke
      && indexInvoke < indexThread) {
      Log.d(`art_method`, JSON.stringify(symbol));

      Interceptor.attach(symbol.address, {
        onEnter: function (args) {
          const method_name = prettyMethod(args[0], 0);
          console.log('ArtMethod Invoke:' + method_name + '  called from:\n' +
            Thread.backtrace(this.context, Backtracer.ACCURATE)
              .map(DebugSymbol.fromAddress).join('\t\n\t') + '\n');
        },
      });

    }

  });
}

class StdString {
  handle: NativePointer;

  constructor() {
    this.handle = Memory.alloc(3 * Process.pointerSize);
  }

  // dispose() {
  //   const [data, isTiny] = this._getData();
  //   if (!isTiny) {
  //     // Java.$delete(data);
  //     // (this as Java.Wrapper).$dispose();
  //   }
  // }

  disposeToString() {
    return this.toString();
  }

  private toString() {
    const [data] = this._getData();
    return (data as NativePointer).readUtf8String();
  }

  _getData() {
    const str = this.handle;
    const isTiny = (str.readU8() & 1) === 0;
    const data = isTiny ? str.add(1) : str.add(2 * Process.pointerSize).readPointer();
    return [data, isTiny];
  }
}

// @see https://android.googlesource.com/platform/art/+/master/runtime/art_method.cc#850
function prettyMethod(method_id: NativePointer, withSignature: boolean) {
  const result = new StdString();

  // Java.api['art::ArtMethod::PrettyMethod'](result, method_id, withSignature ? 1 : 0);
  return result.disposeToString();
}

