"use strict";

"use strict";

import { Log } from "./logger.js";
import { StackBackTrace } from "./stackBacktrace.js";

/**
 * enumerateMethod
 * Get a list of class methods
 * @param {Java.Method} clz
 * @return{string[]}
 */
export function enumerateMethod(clz: Java.Wrapper): string[] {
  const declaredMethods = clz.class.getDeclaredMethods();
  let MethodList: string[] = [];
  for (let i = 0; i < declaredMethods.length; i++) {
    const methodName = declaredMethods[i].getName();
    MethodList.push(methodName);
  }
  return MethodList;
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
  const overloads = method.overloads;
  for (let i = 0; i < overloads.length; i++) {
    const subMethod = overloads[i];
    fn(subMethod);
  }
}

/**
 * ClzHook: Hook processing standard template, suitable for standardized hook processing logic
 * @param subMethod
 * @constructor
 */
export function ClzHook(subMethod: Java.Method): void {
  subMethod.implementation = function () {
    const result = this[subMethod.methodName].apply(this, arguments);
    Log.i(`class: ${subMethod.holder.$className}\t\n\t fn-signature:${subMethod}`, `\t\n\t args: ${Array.from(arguments).toString()} \t\n\t result: ${result}, \n${StackBackTrace.androidLog()}`);
    return result;
  };
}
