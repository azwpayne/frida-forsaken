// "use strict";
//
//
//
// export function hook_native() {
//   Process.getModuleByName("libart.so").enumerateSymbols().forEach(symbol => {
//
//     if (symbol.name.includes("ArtMethod")
//         && symbol.name.includes("Invoke")
//         && symbol.name.includes("Thread")
//         && symbol.name.indexOf("ArtMethod") < symbol.name.indexOf("Invoke")
//         && symbol.name.indexOf("Invoke") < symbol.name.indexOf("Thread")
//     ) {
//       console.log(symbol.name);
//       Interceptor.attach(symbol.address, {
//         onEnter: function (args) {
//           const method_name = prettyMethod(args[0], 0);
//           if (!method_name.startsWith("java.")
//               || !method_name.startsWith("java.")
//           ) {
//             console.log("ArtMethod Invoke:" + method_name + "  called from:\n" +
//                 Thread.backtrace(this.context, Backtracer.ACCURATE)
//                 .map(DebugSymbol.fromAddress).join("\n") + "\n");
//
//           }
//         },
//       });
//     }
//   });
// }
//
