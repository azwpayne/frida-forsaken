"use strict";

import { Log } from "../../utils/logger.js";

export function memCmpAddr(): void {
  const memcmp_addr = Module.getExportByName("libc.so", "fread");
  Log.d(`bypass anti frida inline hook memCmpAddr`, memcmp_addr);
  Interceptor.attach(memcmp_addr, {
    onEnter(args) {
      this.buffer = args[0];   // 保存 buffer 参数
      this.size = args[1];     // 保存 size 参数
      this.count = args[2];    // 保存 count 参数
      this.stream = args[3];   // 保存 FILE* 参数
    },
    onLeave(retval) {
      console.log(this.count.toInt32());
      Log.d(`bypass anti frida inline hook memCmpAddr onLeave`, memcmp_addr);
      if (this.count.toInt32() == 8) {
        Kernel.writeByteArray(this.buffer, [0x50, 0x00, 0x00, 0x58, 0x00, 0x02, 0x1f, 0xd6]);
        retval.replace(ptr(8)); // 填充前8bit
        console.log(hexdump(this.buffer));
      }
    },
  });
}