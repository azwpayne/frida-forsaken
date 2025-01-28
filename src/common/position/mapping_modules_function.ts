import { Log } from '../../utils/logger.js';

/**
 * Used to observe the mapping relationship between lib exported function and Java native function
 * @param module_name_filter {string}
 * @param exporter_name_filter {string}
 */
export function mapping_modules_function(
  module_name_filter: string = 'lib',
  exporter_name_filter: string = 'Java_',
): void {
  Process.enumerateModules().forEach(module => {
    if (module.name.includes(module_name_filter)) {
      module.enumerateExports().forEach(exporter => {
        if (exporter.name.startsWith(exporter_name_filter)) {
          const result = {
            'fn_name': exporter.name,
            'fn_base_address': exporter.address,
            'fn_offset': `${module.name}!${exporter.address.sub(
              module.base)}-module_base:${module.base}`,
            'module_path': module.path,
          };
          Log.i('mapping_modules_function', JSON.stringify(result));
        }
      });
    }
  });
}