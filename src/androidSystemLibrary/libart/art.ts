'use strict';

import { Log } from '../../utils/logger.js';

/**
 * @ses https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/functions.html#class_operations
 * @param filterSoName
 */
export function hook_libart(filterSoName: string) {
  Process.getModuleByName('libart.so').enumerateSymbols()
    .forEach(symbol => {
      if (symbol.name.includes('_ZN3art3JNIILb0')
        && symbol.name.includes('JNI')
        && symbol.name.includes('art')
        && !symbol.name.includes('CheckJNI')
      ) {
        Log.i(`symbolInformation`, JSON.stringify(symbol));
        if (symbol.name.includes('GetStringUTFChars')) {
          hook_GetStringUTFChars(symbol.address);
        }

        // todo: native funciton hook
        // Interceptor.attach(symbol.address, {
        //       onEnter(args) {
        //         if (Process.getModuleByAddress(this.returnAddress).name.startsWith(filterSoName)) {
        //           const class_name = Java.vm.tryGetEnv().getClassName(args[1]);
        //           if (!class_name.includes("java.") && !class_name.includes("android.")) {
        //             Log.i(`JavaCodeInformation`, class_name);
        //             Log.i(`DebugSymbolInformation`, DebugSymbol.fromAddress(this.returnAddress));
        //           }
        //         }
        //       },
        //     },
        // );

      }
    });
}

// todo: impl
function hook_GetStringUTFChars(symbolAddress: NativePointer) {

  Interceptor.attach(symbolAddress, {
    onEnter(args){

    },
    onLeave(retval){

    }

  })
}
