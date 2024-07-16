"use strict";


import { ClzHook, enumerateMethod, methodRoam } from "../utils/classMethodRoam.js";

export function androidText(): void {
  const TextUtils = Java.use("android.text.TextUtils");
  enumerateMethod(TextUtils).forEach(el => {
    methodRoam(TextUtils[el], ClzHook);
  });
}