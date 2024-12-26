"use strict";


export function find_RegisterNatives() {
  Process.getModuleByName("libart.so").enumerateSymbols().forEach(symbol => {
    if (symbol.name.indexOf("art") >= 0 &&
        symbol.name.indexOf("JNI") >= 0 &&
        symbol.name.indexOf("RegisterNatives") >= 0 &&
        symbol.name.indexOf("CheckJNI") < 0) {
      console.log("RegisterNatives is at ", symbol.address, symbol.name);
      if (!symbol.address) {
        hook_RegisterNatives(symbol.address);
      }
    }
  });
}

function hook_RegisterNatives(register_natives_address: NativePointer) {
  Interceptor.attach(register_natives_address, {
    onEnter(args): void {
      console.log("[RegisterNatives] method_count:", args[3]);
      let java_class = args[1];
      let class_name = Java.vm.tryGetEnv().getClassName(java_class);

      let methods_ptr: NativePointer = args[2].readPointer();
      let method_count = parseInt(args[3] as any);
      for (let i = 0; i < method_count; i++) {
        let name_ptr = methods_ptr.add(i * Process.pointerSize * 3).readPointer();
        let sig_ptr = methods_ptr.add(i * Process.pointerSize * 3 + Process.pointerSize).readPointer();
        let fnPtr_ptr = methods_ptr.add(i * Process.pointerSize * 3 + Process.pointerSize * 2).readPointer();

        let name = name_ptr.readCString();
        let sig = sig_ptr.readCString();
        let symbol = DebugSymbol.fromAddress(fnPtr_ptr);
        console.log("[RegisterNatives] java_class:", class_name, "name:", name, "sig:", sig, "fnPtr:", fnPtr_ptr, " fnOffset:", symbol, " callee:", DebugSymbol.fromAddress(this.returnAddress));
      }
    },
  });
}