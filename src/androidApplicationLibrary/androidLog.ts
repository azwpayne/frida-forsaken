"use strict";
import { ClzHook, enumerateMethod, methodRoam } from "../utils/classMethodRoam.js";

export function AndroidLog() {
  const AndroidLog = Java.use("android.util.Log");
  enumerateMethod(AndroidLog).forEach(el => {
    methodRoam(AndroidLog[el], ClzHook);
  });
}
