"use strict";


import { Log } from "../../utils/logger.js";

export function libart(filterSoName: string = "libsgmainso-6.6.231201.33656539.so") {
  const soProcess = Process.findModuleByName("libart.so");

  soProcess?.enumerateSymbols().forEach(symbol => {
        if (symbol.name.indexOf("art") >= 0 &&
            symbol.name.indexOf("JNI") >= 0 &&
            symbol.name.indexOf("CheckJNI") < 0 &&
            symbol.name.indexOf("_ZN3art3JNIILb0") >= 0
        ) {
          Log.i(`symbolInformation`, JSON.stringify(symbol));
          if (symbol.address) {
            Interceptor.attach(symbol.address, {
              onEnter: function (args) {
                const module = Process.findModuleByAddress(this.returnAddress);
                if (module != null && module.name.indexOf(filterSoName) == 0) {
                  const java_class = args[1];
                  const class_name = Java.vm.tryGetEnv().getClassName(java_class);
                  if (class_name.indexOf("java.") == -1 && class_name.indexOf("android.") == -1) {
                    Log.i(`JavaCodeInformation`, class_name);
                    Log.i(`DebugSymbolInformation`, DebugSymbol.fromAddress(this.returnAddress));
                  }
                }
              },
            });
          }
        }
      },
  );
}