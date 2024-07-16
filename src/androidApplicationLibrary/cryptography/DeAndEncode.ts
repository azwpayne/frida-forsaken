"use strict";

/**
 * android.util.Base64
 * java.util.Base64
 * java.net.URLEncode
 * okio.Base64
 * okio.ByteString
 */

import { Log } from "../../utils/logger.js";
import { StackBackTrace } from "../../utils/stackBacktrace.js";


const androidUtilBase64Wrapper: Java.Wrapper = Java.use("android.util.Base64");
const jString = Java.use("java.lang.String");


// export function base64() {
//   const base64 = Java.use("android.util.Base64");
//   // enumerateMethod(base64).forEach(el => {
//   //   // methodRoam(base64[el], ClzHook);
//   //   // console.log(el);
//   // });
//   enumerateMethodSignature(base64);
// }


/**
 * class: java.lang.Class method: public static byte[] android.util.Base64.decode(java.lang.String,int)
 */
export function androidUtilBase64DecodeStringInt(): void {
  androidUtilBase64Wrapper["decode"].overload("java.lang.String", "int").implementation = function (s: string, i: number): void {
    const result = this["decode"].apply(this, arguments);
    Log.i(`class: android.util.Base64.decode(java.lang.String,int) byte[]`, `\t\n\t args: ${jString.$new(s)}!${i} \t\n\t result: ${jString.$new(result)} \n${StackBackTrace.androidLog()}`);
    return result;
  };
}

/**
 * class: java.lang.Class method: public static byte[] android.util.Base64.decode(byte[],int)
 */
export function androidUtilBase64DecodeByteInt(): void {
  androidUtilBase64Wrapper["decode"].overload("[B", "int").implementation = function (b: number[], i: number) {
    const result = this["decode"].apply(this, arguments);
    Log.i(`class: android.util.Base64.decode(byte[],int) byte[]`, `\t\n\t args: ${jString.$new(b)}!${i} \t\n\t result: ${jString.$new(result)} \n${StackBackTrace.androidLog()}`);
    return result;
  };
}

/**
 * java.lang.Class method: public static byte[] android.util.Base64.decode(byte[],int,int,int)
 */
export function androidUtilBase64DecodeByteIntIntInt(): void {
  androidUtilBase64Wrapper["decode"].overload("[B", "int", "int", "int").implementation = function (b: number[], i1: number, i2: number, i3: number) {
    const result = this["decode"].apply(this, arguments);
    Log.i(`class: android.util.Base64.decode(byte[],int,int,int) byte[]`, `\t\n\t args: ${jString.$new(b)}!${i1}!${i2}!${i3} \t\n\t result: ${jString.$new(result)} \n${StackBackTrace.androidLog()}`);
    return result;
  };
}


/**
 * class: java.lang.Class method: public static byte[] android.util.Base64.encode(byte[],int)
 */
export function androidUtilBase64EncodeByteInt(): void {
  androidUtilBase64Wrapper["encode"].overload("[B", "int").implementation = function (b: number[], i: number) {
    const result = this["decode"].apply(this, arguments);
    Log.i(`class: android.util.Base64.encode(byte[],int) byte`, `\t\n\t args: ${jString.$new(b)}!${i} \t\n\t result: ${jString.$new(result)} \n${StackBackTrace.androidLog()}`);
    return result;
  };
}

/**
 * java.lang.Class method: public static byte[] android.util.Base64.decode(byte[],int,int,int)
 */
export function androidUtilBase64EncodeByteIntIntInt(): void {
  androidUtilBase64Wrapper["decode"].overload("[B", "int", "int", "int").implementation = function (b: number[], i1: number, i2: number, i3: number) {
    const result = this["decode"].apply(this, arguments);
    Log.i(`class: android.util.Base64.encode(byte[],int,int,int) byte[]`, `\t\n\t args: ${jString.$new(b)}!${i1}!${i2}!${i3} \t\n\t result: ${jString.$new(result)} \n${StackBackTrace.androidLog()}`);
    return result;
  };
}

/**
 * class: java.lang.Class method: public static java.lang.String android.util.Base64.encodeToString(byte[],int)
 */
export function androidUtilBase64EncodeToStringByteInt(): void {
  androidUtilBase64Wrapper["encodeToString"].overload("[B", "int").implementation = function (b: number[], i: number) {
    const result = this["encodeToString"].apply(this, arguments);
    Log.i(`class: android.util.Base64.encode(byte[],int) String`, `\t\n\t args: ${jString.$new(b)}!${i} \t\n\t result: ${result} \n${StackBackTrace.androidLog()}`);
    return result;
  };
}

/**
 * class: java.lang.Class method: public static java.lang.String android.util.Base64.encodeToString(byte[],int,int,int)
 */
export function androidUtilBase64EncodeToStringByteIntIntInt(): void {
  androidUtilBase64Wrapper["encodeToString"].overload("[B", "int", "int", "int").implementation = function (b: number[], i1: number, i2: number, i3: number) {
    const result = this["encodeToString"].apply(this, arguments);
    Log.i(`class: android.util.Base64.encodeToString(byte[],int,int,int) String`, `\t\n\t args: ${jString.$new(b)}!${i1}!${i2}!${i3} \t\n\t result: ${result}, \n${StackBackTrace.androidLog()}`);
    return result;
  };
}


