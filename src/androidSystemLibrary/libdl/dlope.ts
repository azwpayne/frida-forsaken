'use strict';

let library_loaded = false;

/**
 *
 * @param module_filter_name
 * @param fn
 */
export function hook_dlopen(module_filter_name: string = '', fn: Function) {

  const dlopen_addr = parseInt(Java.androidVersion) < 8
    ? Module.getExportByName(null, 'dlopen')
    : Module.getExportByName(null, 'android_dlopen_ext');

  Interceptor.attach(dlopen_addr, {
    onEnter(args) {
      const library_path = args[0].readCString();
      if (library_path && library_path.includes(module_filter_name)) {
        console.log('[...] Loading library : ' + library_path);
      }
      library_loaded = true;
    },
    onLeave(retval) {
      if (library_loaded) {
        library_loaded = false;
        return fn();
      }
    },
  });
}