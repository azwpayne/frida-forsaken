"use strict";

import { Log } from "./utils/logger.js";
import { base64 } from "./androidApplicationLibrary/cryptography/DeAndEncode.js";

setImmediate(main);

function main() {
  Log.d(`Start`, `Frida successfully injected into the application!!!`);
  try {
    JavaHandler();
  } catch (e) {
    Log.e(`main error`, e);
  }
}

function JavaHandler() {
  Java.perform(function () {
    base64();
  });
}
