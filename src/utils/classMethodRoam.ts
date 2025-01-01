'use strict';

import { Log } from './logger.js';
import { StackBackTrace } from './stackBacktrace.js';

/**
 * enumerateMethod
 * Get a list of class methods
 * @param {Java.Method} clz
 * @return{string[]}
 */
const methods: Set<string> = new Set();

export function enumerateMethod(clz: Java.Wrapper): Set<string> {
  const declaredMethods: Java.Wrapper = clz.class.getDeclaredMethods();
  declaredMethods.map((m: Java.Wrapper) => {
    methods.add(m.getName());
  });
  return methods;
}

export function enumerateMethodSignature(clz: Java.Wrapper) {
  const declaredMethods = clz.class.getDeclaredMethods();
  declaredMethods.forEach((methodName: string) => {
    Log.i(`enumerateMethodSignature`, `class: ${clz.class.$className} method: ${methodName}`);
  });
}

/**
 * methodRoam Process one or more specified methods in a specified way
 * @param method target method name
 * @param {(subMethod: Java.Method) => void} fn target method process logic
 */
export function methodRoam(
  method: Java.Wrapper,
  fn: (subMethod: Java.Method) => void,
): void {
  method.overloads.forEach((subMethod: Java.Method) => {
    fn(subMethod);
  });
}

/**
 * ClzHook: Hook processing standard template, suitable for standardized hook processing logic
 * @param subMethod
 * @constructor
 */
export function ClzHook(subMethod: Java.Method): void {
  subMethod.implementation = function () {
    const result = this[subMethod.methodName].apply(this, arguments);
    Log.i(`class: ${subMethod.holder.$className}\t\n\t fn-signature:${subMethod}`, `\t\n\t args: ${Array.from(
      arguments).toString()} \t\n\t result: ${result}, \n${StackBackTrace.androidLog()}`);
    return result;
  };
}
