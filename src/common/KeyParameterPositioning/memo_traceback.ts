import { Log } from '../../utils/logger.js';

/**
 * memo_traceback
 * Backtracking based on memory release to locate key parameters
 * @param target_so_name{string}
 * @param target_str {string}
 */
export function memo_traceback(target_so_name: string, target_str: string): void {
  const libc_free_addr = Module.getExportByName('libc.so', 'free');
  const source_so_base_addr = Module.getBaseAddress(target_so_name);

  Log.i(`[memo_traceback]`, `free addr ${libc_free_addr}, source base addr ${source_so_base_addr}`);
  Interceptor.attach(libc_free_addr, {
    onEnter(args) {
      const free_str = args[0].readCString();
      if (free_str && free_str.includes(target_str)) {
        const ctx = this.context as Arm64CpuContext;
        Log.i(`memo_traceback`, `free_str: ${free_str}free lr: ${ctx.lr.sub(source_so_base_addr)}`);
      }
    },
  });
}