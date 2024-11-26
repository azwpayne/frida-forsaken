"use strict";


export function hook_all_dlopen(module_filter_name: string = "", fn: Function) {
  Java.androidVersion > "6.0.0"
      ? dlopen_hook(module_filter_name, fn)
      : android_dlopen_ext_hook(module_filter_name, fn);
}

export function a(symbol: NativePointerValue, moduleFilterName: string, func: (...args: any[]) => void): void {
  Interceptor.attach(symbol, {
    onEnter(args) {
      const loadPath = args[0].readCString();

      if (loadPath && loadPath.includes(moduleFilterName) && this.path.includes(moduleFilterName)) {
        this.canhook = true;
        console.log(`dlopen path: ${this.path}`);
      }

    },
    onLeave(retval) {
      if (this.canhook) {
        return func();
      }
    },
  });
}


export function dlopen_hook(module_filter_name: string, fn: Function): void {
  const dlopen = Module.getExportByName(null, "dlopen");
  console.log("dlopen: ", dlopen);
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
        return fn();
      }
    },
  });

}

export function android_dlopen_ext_hook(module_filter_name: string, fn: Function): void {
  const android_dlopen_ext = Module.getExportByName(null, "android_dlopen_ext");
  console.log(`android_dlopen_ext: ${android_dlopen_ext}`);

  Interceptor.attach(android_dlopen_ext, {
    onEnter: function (args) {
      const path_ptr = args[0];
      this.path = path_ptr.readCString();
      if (this.path.includes(module_filter_name)) {
        this.canhook = true;
        console.log(`android_dlopen_ext path: ${this.path}`);
      }

    },
    onLeave: function (retval) {
      if (this.canhook) {
        return fn();
      }
    },
  });

}