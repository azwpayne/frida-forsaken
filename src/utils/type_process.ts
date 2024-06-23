"use strict";

export class FridaTypeUtils {

  /**
   * Quick and convenient printing of objects in frida
   * * Preconditions: r0gson.dex
   * @param val
   */
  static java_obj(val: any) {
    Java.openClassFile("/data/local/tmp/r0gson.dex").load();
    const gson = Java.use("com.r0ysue.gson.Gson").$new();
    return gson.toJson(val);
  }

  static byte(val: any) {
    const JString = Java.use("java.lang.String");
    return JString.$new(val);
  }

}