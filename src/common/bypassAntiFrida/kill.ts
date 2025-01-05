'use strict';

import { Log } from '../../utils/logger.js';

export function replaceKILL(): void {
  Interceptor.replace(
    Module.getExportByName('libc.so', 'kill'),
    new NativeCallback(
      (a: number, b: number): void => {
        Log.d(`bypass anti frida replaceKILL`, `args: ${a}!${b}`);
        Log.d(`bypass anti frida replaceKILL native stack fuzz:`, Thread.backtrace().map(DebugSymbol.fromAddress).join('\t\n\t'));
      },
      'void',
      ['int', 'int'],
    ),
  );
}