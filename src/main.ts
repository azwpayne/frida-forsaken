'use strict';

import { enumerateMethod } from './utils/classMethodRoam.js';
import { Log } from './utils/logger.js';

setImmediate(function main() {
  Log.d(``, `Frida Injection successful!!!`);
  try {
    if (Java.available) {
      JavaHandler();
    }
    if (Kernel.available) {
      KernelHandler()
    }
    if (ObjC.available) {
      ObjCHandler()
    }
  } catch (e) {
    Log.e(`main error`, e);
  }
});

// // ### JavaHandler ###
function JavaHandler() {
  Java.perform(function () {
    Watch();
    // ActivityInfo();
    const results = enumerateMethod(Java.use('java.lang.String'));
    results.forEach(result => {
      Log.i(`enumerateMethod`, `java.lang.String method name: ${result}`);
    });
  });
}
function Watch() {
  // throw new Error("Function not implemented.");
  // todo: from jadx generate hook code
}


// // ### KernelHandler ###
function KernelHandler():void {

}

// // ### ObjCHandler ###
function ObjCHandler():void {

}



