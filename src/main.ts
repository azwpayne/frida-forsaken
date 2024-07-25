"use strict";

import { ActivityInfo } from "./androidApplicationLibrary/Activity.js";
import { Log } from "./utils/logger.js";

setImmediate(main);

function main() {
  Log.d(`Start`, `Frida successfully injected into the Application!!!`);
  try {
    JavaHandler();
  } catch (e) {
    Log.e(`main error`, e);
  }
}

function JavaHandler() {
  Java.perform(function () {
    Watch();

    ActivityInfo();
  });
}

function Watch() {
  // throw new Error("Function not implemented.");
  // todo: from jadx generate hook code
}

