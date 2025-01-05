'use strict';

import { ClzHook, enumerateMethod, methodRoam } from '../utils/classMethodRoam';

/**
 * java.lang.String
 * java.lang.StringFactory
 * java.lang.StringBuild
 * java.lang.StringBuffer
 *
 */

/**
 * In the Android virtual machine, switch the String constructor to StringFactory
 * @constructor
 */
export function StringFactory(): void {
  const stingFactory = Java.use('java.lang.StringFactory');
  enumerateMethod(stingFactory).forEach(el => {
    methodRoam(stingFactory[el], ClzHook);
  });
}

export function StringBuild() {
  const StringBuilder = Java.use('java.lang.StringBuilder');
  enumerateMethod(StringBuilder).forEach(el => {
    methodRoam(StringBuilder[el], ClzHook);
  });
}

export function StringBuffer() {
  const StringBuffer = Java.use('java.lang.StringBuffer');
  enumerateMethod(StringBuffer).forEach(el => {
    methodRoam(StringBuffer[el], ClzHook);
  });
}
