"use strict";


// export function openConnection(): void {
//   const netURL = Java.use("java.net.URL");
//   const openConnection = netURL["openConnection"];
//   openConnection.overload("java.net.Proxy").implementation = function () {
//     return this.apply(this, arguments);
//   };
// }
//
// export function BuilderProxy() {
//   const Builder = Java.use("okhttp3.OkHttpClient$Builder").$new();
//   const BuilderProxy = Builder["proxy"];
//   BuilderProxy.overload("java.net.Proxy").implementation = function () {
//     return BuilderProxy.apply(this, arguments);
//   };
// }

import { ClzHook, methodRoam } from "../../utils/classMethodRoam";

export function netURL(): void {
  const clz = Java.use("java.net.URL");
  methodRoam(clz["openConnection"], ClzHook);
}

export function OkHttpClientBuilder(): void {
  const Builder = Java.use("okhttp3.OkHttpClient$Builder").$new();
  methodRoam(Builder["proxy"], ClzHook);
}


