"use strict";

// Symmetric-key algorithm

import { enumerateMethod, methodRoam } from "../../utils/classMethodRoam.js";
import { Log } from "../../utils/logger.js";
import { StackBackTrace } from "../../utils/stackBacktrace.js";


// DES DES-ede AES PBE RSA
export function cryptoCipher(): void {
  const cipher = Java.use("javax.crypto.Cipher");
  enumerateMethod(cipher).forEach(el => {
    methodRoam(cipher[el], (subMethod: Java.Method) => {
      subMethod.implementation = function () {
        const result = this[subMethod.methodName].apply(this, arguments);
        Log.i(`class: ${subMethod.holder.$className}\t\n\t fn-signature:${subMethod}`, `\t\n\t args: ${Array.from(arguments).toString()} \t\n\t result: ${result}, \n${StackBackTrace.androidLog()}`);
        return result;
      };
    });
  });
}

// Mac
export function cryptoMac() {
  const cryptoMac = Java.use("javax.crypto.Mac");
  enumerateMethod(cryptoMac).forEach(el => {
    methodRoam(cryptoMac[el], (subMethod: Java.Method) => {
      subMethod.implementation = function () {
        const result = this[subMethod.methodName].apply(this, arguments);
        Log.i(`class: ${subMethod.holder.$className}\t\n\t fn-signature:${subMethod}`, `\t\n\t args: ${Array.from(arguments).toString()} \t\n\t result: ${result}, \n${StackBackTrace.androidLog()}`);
        return result;
      };
    });
  });
}

// MD SHA
export function securityMessageDigest(): void {
  const securityMessageDigest = Java.use("java.security.MessageDigest");
  enumerateMethod(securityMessageDigest).forEach(el => {
    methodRoam(securityMessageDigest[el], (subMethod: Java.Method) => {
      subMethod.implementation = function () {
        const result = this[subMethod.methodName].apply(this, arguments);
        Log.i(`class: ${subMethod.holder.$className}\t\n\t fn-signature:${subMethod}`, `\t\n\t args: ${Array.from(arguments).toString()} \t\n\t result: ${result}, \n${StackBackTrace.androidLog()}`);
        return result;
      };
    });
  });
}