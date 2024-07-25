"use strict";

import { Log } from "../../utils/logger.js";

export function libart(filterSoName: string) {
  Process
  .getModuleByName("libart.so")
  .enumerateSymbols()
  .forEach(symbol => {
        if (
            symbol.name.includes("_ZN3art3JNIILb0")
            && symbol.name.includes("JNI")
            && !symbol.name.includes("CheckJNI")
            && symbol.name.includes("art")
        ) {
          Log.i(`symbolInformation`, JSON.stringify(symbol));
          Interceptor.attach(
              symbol.address,
              {
                onEnter(args) {
                  const module = Process.getModuleByAddress(this.returnAddress);
                  if (module.name.indexOf(filterSoName) == 0) {
                    const java_class = args[1];
                    const class_name = Java.vm.tryGetEnv().getClassName(java_class);
                    if (!class_name.includes("java.")
                        && !class_name.includes("android.")) {
                      Log.i(`JavaCodeInformation`, class_name);
                      Log.i(`DebugSymbolInformation`, DebugSymbol.fromAddress(this.returnAddress));
                    }
                  }
                },
              },
          );
        }
      },
  );
}