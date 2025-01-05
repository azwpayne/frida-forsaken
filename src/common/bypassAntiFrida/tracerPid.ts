'use strict';

/**
 * ByPassTracerPid
 */
export function ByPassTracerPid(): void {
  const fgets_addr = Module.getExportByName('libc.so', 'fgets');

  const fgets = new NativeFunction(fgets_addr, 'pointer', ['pointer', 'int', 'pointer']);

  Interceptor.replace(fgets_addr, new NativeCallback(function (buffer: NativePointer, size: number, fp: NativePointer) {
      const retval = fgets(buffer, size, fp);
      const bufferUtf8String = buffer.readUtf8String(size);

      if (bufferUtf8String && bufferUtf8String.indexOf('TracerPid:') >= 0) {
        buffer.writeUtf8String('TracerPid:0');
        console.log(`bufferUtf8String:${bufferUtf8String}`);
      }

      return retval;
    },
    'pointer',
    ['pointer', 'int', 'pointer'],
  ));
}
