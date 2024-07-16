"use strict";

import { ClzHook, enumerateMethod, methodRoam } from "../utils/classMethodRoam";

/**
 * java.lang.String
 * java.lang.StringFactory
 * java.lang.StringBuild
 * java.lang.StringBuffer
 *
 *
 */

/**
 * 在Android虚拟机中，将String的构造函数切换成了StringFactory
 * @constructor
 */
export function StringFactory(): void {
  const stingFactory = Java.use("java.lang.StringFactory");
  enumerateMethod(stingFactory).forEach(el => {
    methodRoam(stingFactory[el], ClzHook);
  });
}

export function StringBuild() {
  const StringBuilder = Java.use("java.lang.StringBuilder");
  enumerateMethod(StringBuilder).forEach(el => {
    methodRoam(StringBuilder[el], ClzHook);
  });
}

export function StringBuffer() {
  const StringBuffer = Java.use("java.lang.StringBuffer");
  enumerateMethod(StringBuffer).forEach(el => {
    methodRoam(StringBuffer[el], ClzHook);
  });
}
