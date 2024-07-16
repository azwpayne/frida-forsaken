"use strict";


export function antiMaps(): void {
  antiMapUtil(Module.getExportByName("libc.so", "strstr"));
  antiMapUtil(Module.getExportByName("libc.so", "strcmp"));
}

function antiMapUtil(np: NativePointer): void {
  Interceptor.attach(np,
      {
        onEnter(args) {
          const str = args[1].readCString();
          if (str) {
            if (
                str.toLowerCase().indexOf("reject") !== -1
                || str.toLowerCase().indexOf("inject") !== -1
                || str.toLowerCase().indexOf("infect") !== -1
                || str.toLowerCase().indexOf("frida") !== -1
                || str.toLowerCase().indexOf("gadget") !== -1
                || str.toLowerCase().indexOf("xposed") !== -1
                || str.toLowerCase().indexOf("tmp") !== -1
                || str.toLowerCase().indexOf("gum-js-loop") !== -1
                || str.toLowerCase().indexOf("gmain") !== -1
                || str.toLowerCase().indexOf("gdbus") !== -1
                || str.toLowerCase().indexOf("linjector") !== -1
            ) {
              this.hook = true;
            }
          }
        },
        onLeave(retval) {
          if (this.hook) {
            retval.replace(ptr(0));
          }
        },
      });
}

export function mapRedirect(): void {
  const FakeMaps = "/data/data/xx.xx.xx/maps";
  const openPtr = Module.getExportByName("libc.so", "open");
  const open = new NativeFunction(openPtr, "int", ["pointer", "int"]);
  const readPtr = Module.getExportByName("libc.so", "read");
  const read = new NativeFunction(readPtr, "int", ["int", "pointer", "int"]);
  const MapsBuffer = Memory.alloc(512);
  const MapsFile = new File(FakeMaps, "w");

  Interceptor.replace(openPtr, new NativeCallback(function (pathname, flag) {
    const FD = open(pathname, flag);
    const ch = pathname.readCString();
    if (ch && ch.indexOf("/proc/") >= 0 && ch.indexOf("maps") >= 0) {
      console.log("open : ", pathname.readCString());
      while (read(FD, MapsBuffer, 512) !== 0) {
        let MBuffer = MapsBuffer.readCString();
        if (MBuffer) {
          MBuffer = MBuffer.replaceAll("/data/local/tmp/re.frida.server/frida-agent-64.so", "FakingMaps");
          MBuffer = MBuffer.replaceAll("re.frida.server", "FakingMaps");
          MBuffer = MBuffer.replaceAll("frida-agent-64.so", "FakingMaps");
          MBuffer = MBuffer.replaceAll("frida-agent-32.so", "FakingMaps");
          MBuffer = MBuffer.replaceAll("frida", "FakingMaps");
          MBuffer = MBuffer.replaceAll("/data/local/tmp", "/data");
          MapsFile.write(MBuffer);
        }
      }
      const filename = Memory.allocUtf8String(FakeMaps);
      return open(filename, flag);
    }
    return FD;
  }, "int", ["pointer", "int"]));
}

