"use strict";

import { Log } from "./utils/logger.js";
import { base64 } from "./androidApplicationLibrary/cryptography/DeAndEncode.js";

setImmediate(main);

function main() {
  Log.d(`Start`, `Frida successfully injected into the application!!!`);
  try {
    JavaHandler();
  } catch (e) {
    Log.e(`main`, e);
  }
}

function JavaHandler() {
  Java.perform(function () {
    // roamMethod("mtopsdk.security.InnerSignImpl", "getUnifiedSign");
    // roamMethod("java.util.HashMap", "put");
    // -------------

    // roam("java.util.HashMap", "put", (target_method, subMethod) => {
    //   subMethod.implementation = function () {
    //     const result = this[target_method].apply(this, arguments);
    //
    //     Log.i(`roam_subMethod`, `\t\n\t args: ${Array.from(arguments).toString()} \t\n\t result: ${result}, \n${StackBackTrace.androidLog()}`);
    //     return result;
    //   };
    // });

    // enumerateAllClassAndMethod();

    // const targetClass = Java.use("java.lang.String");
    // const targetMethod = "add";
    // hook('put', targetClass[targetMethod]);

    // const methods = enumerateMethod("java.lang.String");

    // const methodOverloads = clz[methodName].overloads;
    // methodOverloads.push();

    // enumerateOverloader(Java.use("java.util.HashMap"), "replace");

    // const jString = Java.use("java.lang.String");
    // const overloads = jString["replace"].overloads;
    //
    // console.log(jString.$className);
    //
    //
    // for (let i = 0; i < overloads.length; i++) {
    //   const overload = overloads[i];
    //   console.log(overload);
    //   console.log(overload.methodName);
    // }

    // const jString = Java.use("java.lang.String");

    // roam(jString["replace"], ClzHook);

    // base64();
    // cryptoCipher();
    // cryptoMac();
    // securityMessageDigest();

    // const targetClass = Java.use("java.lang.String");
    // const targetMethod = "add";
    // const s = targetClass[targetMethod];
    // console.log(targetClass, targetMethod, s, s.$className);


    base64();
  });
}
