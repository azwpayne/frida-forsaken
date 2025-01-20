'use strict';

import { Log } from '../../utils/logger.js';

export function replaceKILL(): void {
  Interceptor.replace(Module.getExportByName('libc.so', 'kill'),
    new NativeCallback(function (): void {
        Log.d(`bypass anti frida replaceKILL`, `args: ${Array.from(arguments).toString()}`);
        Log.d(`bypass anti frida replaceKILL native stack fuzz:`, Thread.backtrace((this as any).context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\t\n\t'));
      },
      'void',
      ['int', 'int'],
    ),
  );
}