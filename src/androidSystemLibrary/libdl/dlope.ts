"use strict";

export function hook_all_dlopen(
    module_filter_name: string = "", func: Function) {
  dlopen_hook(module_filter_name, func);
  android_dlopen_ext_hook(module_filter_name, func);
}

export function a(symbol: NativePointerValue, moduleFilterName: string, func: (...args: any[]) => void): void {
  Interceptor.attach(symbol, {
    onEnter(args) {
      const loadPath = args[0].readCString();
      if (loadPath && loadPath.indexOf(moduleFilterName) >= 0) {
        if (this.path.indexOf(moduleFilterName) >= 0) {
          this.canhook = true;
          console.log("dlopen path:", this.path);
        }
      }
    },
    onLeave(retvals) {
      if (this.canhook) func();
    },
  });
}


export function dlopen_hook(module_filter_name: string, func: Function): void {
  const dlopen = Module.findExportByName(null, "dlopen");
  console.log("dlopen: ", dlopen);
  if (dlopen) {
    Interceptor.attach(dlopen, {
      onEnter: function (args) {
        const path_ptr = args[0];
        if (path_ptr) {
          this.path = path_ptr.readCString();
          if (this.path.indexOf(module_filter_name) >= 0) {
            this.canhook = true;
            console.log("dlopen path:", this.path);
          }
        }
      },

      onLeave: function (retval) {
        if (this.canhook) {
          func();
        }
      },
    });
  }
}

export function android_dlopen_ext_hook(module_filter_name: string, func: Function): void {
  const android_dlopen_ext = Module.findExportByName(null, "android_dlopen_ext");
  console.log("android_dlopen_ext: ", android_dlopen_ext);

  if (android_dlopen_ext) {
    Interceptor.attach(android_dlopen_ext, {
      onEnter: function (args) {
        const path_ptr = args[0];
        if (path_ptr) {
          this.path = (path_ptr).readCString();
          if (this.path.indexOf(module_filter_name) >= 0) {
            this.canhook = true;
            console.log("android_dlopen_ext path:", this.path);
          }
        }
      },
      onLeave: function (retval) {
        if (this.canhook) {
          func();
        }
      },
    });
  }
}