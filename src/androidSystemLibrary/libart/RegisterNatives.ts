'use strict';

import { Log } from '../../utils/logger.js';

/**
 *
 */
export function find_RegisterNatives() {
  Process.getModuleByName('libart.so').enumerateSymbols()
    .forEach(symbol => {
      if (symbol.name.includes('art')
        && symbol.name.includes('JNI')
        && symbol.name.includes('RegisterNatives')
        && !symbol.name.includes('CheckJNI')) {
        Log.d(`RegisterNatives`, JSON.stringify(symbol));
        if (symbol.address) {
          hook_RegisterNatives(symbol.address);
        }
      }
    });
}

function hook_RegisterNatives(register_natives_address: NativePointer) {
  Interceptor.attach(register_natives_address, {
    onEnter: function (args) {
      const java_class = args[1];
      const class_name = Java.vm.tryGetEnv().getClassName(java_class);
      const methods_ptr = args[2].readPointer();

      for (let i = 0; i < parseInt(args[3].toString()); i++) {
        const name_ptr = methods_ptr.add(i * Process.pointerSize * 3);
        const sig_ptr = methods_ptr.add(i * Process.pointerSize * 3 + Process.pointerSize);
        const fnPtr_ptr = methods_ptr.add(i * Process.pointerSize * 3 + Process.pointerSize * 2);
        const symbol = DebugSymbol.fromAddress(fnPtr_ptr);

        Log.i(`RegisterNatives`, `
        java_class:${java_class.readCString()} 
        class_name ${class_name} 
        name:${name_ptr.readCString()} 
        sig:${sig_ptr.readCString()} 
        fnPtr:${fnPtr_ptr} 
        fnOffset:${symbol} 
        callee: ${DebugSymbol.fromAddress(this.returnAddress)}`);
      }
    },
  });
}