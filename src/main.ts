'use strict';

import { Log } from './utils/logger.js';
// import { replaceKILL } from './common/bypassAntiFrida/kill.js';
import { hook_jni } from './androidSystemLibrary/libart/jni_watch.js';

setImmediate(function main() {
  Log.i(`main`, `Frida Injection successful!!!`);
  try {
    JavaHandler();
    KernelHandler();
    ObjCHandler();
  } catch (e) {
    Log.e(`main error`, e);
  }
});

// // ### JavaHandler ###
function JavaHandler() {
  Java.perform(function () {
    Watch();
    // ActivityInfo();
    // const results = enumerateMethod(Java.use('java.lang.String'));
    // results.forEach(result => {
    //   Log.i(`enumerateMethod`, `java.lang.String method name: ${result}`);
    // });
  });
}

function Watch() {
  // throw new Error("Function not implemented.");
  // todo: from jadx generate hook code
}

// // ### KernelHandler ###
function KernelHandler(): void {
  // find_RegisterNatives();
  // hook_jni();

  hook_jni();
  // replaceKILL()
}

// // ### ObjCHandler ###
function ObjCHandler(): void {
  // throw new Error("Function not implemented.");
  // todo: from ObjCHandler generate hook code
}



