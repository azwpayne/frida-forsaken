"use strict";

import { ClzHook, enumerateMethod, methodRoam } from "../utils/classMethodRoam.js";

export function ActivityInfo(): void {
  const Activity = Java.use("android.app.Activity");
  enumerateMethod(Activity).forEach(el => {
    if (!el.includes("$") && !el.includes("_")) {
      methodRoam(Activity[el], ClzHook);
    }
  });
}
