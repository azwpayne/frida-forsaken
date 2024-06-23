"use strict";

import { ClzHook, enumerateMethod, methodRoam } from "../../utils/classMethodRoam.js";

export function base64() {
  const base64 = Java.use("android.util.Base64");
  enumerateMethod(base64).forEach(el => {
    methodRoam(base64[el], ClzHook);
  });
}