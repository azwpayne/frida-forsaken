"use strict";

import { ClzHook, enumerateMethod, methodRoam } from "../utils/classMethodRoam.js";

// import { ClzHook, enumerateMethod, methodRoam } from "../utils/classMethodRoam.js";

export function ActivityInfo(): void {
  const Activity = Java.use("android.app.Activity");
  // methodRoam(Activity["onCreate"], ClzHook);
  enumerateMethod(Activity).forEach(el => {
    if (!el.includes('$')
      || !el.includes('_')
    ) {
      methodRoam(Activity[el], ClzHook);
    }
  })
}
