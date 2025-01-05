'use strict';

/**
 *
 * @param module_filter_name
 * @param fn
 */
export function hook_all_dlopen(module_filter_name: string = '', fn: Function) {
  Java.androidVersion < '8.0.0'
    ? hook_dlopen(module_filter_name, fn)
    : hook_android_dlopen_ext(module_filter_name, fn);
}

export function hook_dlopen(module_filter_name: string, fn: Function): void {
  const dlopen = Module.getExportByName(null, 'dlopen');
  console.log('dlopen: ', dlopen);
  Interceptor.attach(dlopen, {
    onEnter: function (args) {
      const path_ptr = args[0];
      if (path_ptr) {
        this.path = path_ptr.readCString();
        if (this.path.indexOf(module_filter_name) >= 0) {
          this.canhook = true;
          console.log('dlopen path:', this.path);
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

export function hook_android_dlopen_ext(module_filter_name: string, fn: Function): void {
  const android_dlopen_ext = Module.getExportByName(null, 'android_dlopen_ext');
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