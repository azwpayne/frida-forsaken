'use strict';

import { Log } from './utils/logger.js';
import { find_RegisterNatives } from './androidSystemLibrary/libart/RegisterNatives.js';

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
  find_RegisterNatives();
}

// // ### ObjCHandler ###
function ObjCHandler(): void {
  // throw new Error("Function not implemented.");
  // todo: from ObjCHandler generate hook code
}



