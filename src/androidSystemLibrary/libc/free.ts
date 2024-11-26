export function memory_free(target_so_name: string, target_str: string): void {
  const free_addr = Module.getExportByName("libc.so", "free");
  const metasec_ml_base_addr = Module.getBaseAddress(target_so_name);

  console.log(`free addr ${free_addr}, metasec_ml base addr ${metasec_ml_base_addr}`);

  Interceptor.attach(free_addr, {
    onEnter(args) {
      const free_str = args[0].readCString();
      if (free_str && free_str.includes(target_str)) {
        console.log(`free lr`, (this.context as Arm64CpuContext).lr.sub(metasec_ml_base_addr));
        console.log(`free`, free_str);
      }
    },
  });

}