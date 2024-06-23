"use strict";

/**
 * ByPassTracerPid
 * @constructor
 */
export function ByPassTracerPid() {
  // const fgetsPtr = Module.findExportByName("libc.so", "fgets");
  // if (!fgetsPtr) {
  //   throw new Error("Failed to find fgets export");
  // }

  const fgetsPtr = Module.getExportByName("libc.so", "fgets");
  const fgets = new NativeFunction(fgetsPtr, "pointer", ["pointer", "int", "pointer"]);

  Interceptor.replace(fgetsPtr, new NativeCallback((buffer: NativePointer, size: number, fp: NativePointer) => {
    const retval = fgets(buffer, size, fp);
    // const buf_str = (Memory as any).readUtf8String(buffer);
    // if (buf_str && buf_str.indexOf("TracerPid:") > -1) {
    //   (Memory as any).writeUtf8String(buffer, "TracerPid:0");
    //   console.log("tracer_pid replaced:" + (Memory as any).readUtf8String(buffer));
    // }
    const bufferUtf8String = buffer.readUtf8String(size);
    if (bufferUtf8String && bufferUtf8String.indexOf("TracerPid:") >= 0) {
      buffer.writeUtf8String("TracerPid:0");
      // console.log("tracer_pid replaced:" + (Memory as any).readUtf8String(buffer));
      console.log(`bufferUtf8String:${bufferUtf8String}`);
    }

    return retval;
  }, "pointer", ["pointer", "int", "pointer"]));
}
