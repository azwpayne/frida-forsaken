"use strict";


import { Log } from "../../utils/logger.js";

export function libart(filterSoName: string = "libsgmainso-6.6.231201.33656539.so") {

  Process
  .getModuleByName("libart.so")
  .enumerateSymbols()
  .forEach(symbol => {
        if (
            symbol.name.indexOf("_ZN3art3JNIILb0") >= 0
            && symbol.name.indexOf("JNI") >= 0
            && symbol.name.indexOf("CheckJNI") < 0
            && symbol.name.indexOf("art") >= 0
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

                    if (class_name.indexOf("java.") == -1
                        && class_name.indexOf("android.") == -1) {
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