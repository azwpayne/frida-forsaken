"use strict";

import { ClzHook, enumerateMethod, methodRoam } from "../utils/classMethodRoam";

export function AndroidView(): void {
  const androidView = Java.use("android.view.View");
  enumerateMethod(androidView).forEach(el => {
    methodRoam(androidView[el], ClzHook);
  });
}

