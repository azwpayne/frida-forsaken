"use strict";

import { ClzHook, enumerateMethod, methodRoam } from "./utils/classMethodRoam.js";
import { Log } from "./utils/logger.js";

// import { JCFHook } from "./androidApplicationLibrary/collection/collection.js";

setImmediate(main);

function main() {
  Log.d(`Start`, `Frida successfully injected into the application!!!`);
  try {
    JavaHandler();
    
  } catch (e) {
    Log.e(`main error`, e);
  }
}

function JavaHandler() {
  Java.perform(function () {
    Watch();
    // androidUtilBase64DecodeStringInt();
    // androidUtilBase64DecodeByteInt();

    // androidUtilBase64DecodeByteIntIntInt();
    //
    // androidUtilBase64EncodeByteInt();
    // androidUtilBase64EncodeByteIntIntInt();
    //
    // androidUtilBase64EncodeToStringByteInt();
    // androidUtilBase64EncodeToStringByteIntIntInt();

    // enumerateMethodSignature(Java.use("java.util.Base64"));
    // androidText();

    // ActivityInfo();

    const Activity = Java.use("android.app.Activity");
    enumerateMethod(Activity).forEach(el => {
      if (el.includes('onCreate')) {
        methodRoam(Activity[el], ClzHook);
      }
    })
  });
}
function Watch() {
  // throw new Error("Function not implemented.");
  // todo: from generate hook code
}

