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
 * @constructor "java.lang.String"
 */
export function string() {
  const java_string = Java.use('java.lang.String');
  enumerateMethod(java_string).forEach(el => {
    methodRoam(java_string[el], ClzHook);
  });
}

/**
 * In the Android virtual machine, switch the String constructor to StringFactory
 * @constructor "java.lang.StringFactory"
 */
export function StringFactory(): void {
  const stingFactory = Java.use('java.lang.StringFactory');
  enumerateMethod(stingFactory).forEach(el => {
    methodRoam(stingFactory[el], ClzHook);
  });
}

/**
 * @constructor "java.lang.StringBuilder"
 */
export function StringBuild() {
  const StringBuilder = Java.use('java.lang.StringBuilder');
  enumerateMethod(StringBuilder).forEach(el => {
    methodRoam(StringBuilder[el], ClzHook);
  });
}

/**
 * @constructor "java.lang.StringBuffer"
 */
export function StringBuffer() {
  const StringBuffer = Java.use('java.lang.StringBuffer');
  enumerateMethod(StringBuffer).forEach(el => {
    methodRoam(StringBuffer[el], ClzHook);
  });
}
