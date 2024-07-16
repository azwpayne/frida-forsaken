"use strict";

export function replaceKILL(): void {
  Interceptor.replace(
      Module.getExportByName("libc.so", "kill"),
      new NativeCallback(
          (a: number, b: number): void => {
            console.log(`args: ${a}!${b}`);
            console.log("native stack fuzz:", Thread.backtrace().map(DebugSymbol.fromAddress).join("\t\n\t"));
          },
          "void",
          ["int", "int"],
      ),
  );
}