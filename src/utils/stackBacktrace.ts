import { Log } from './logger.js';

export class StackBackTrace {

  static androidLog() {
    const logger = Java.use('android.util.Log');
    const throwable = Java.use('java.lang.Throwable').$new();
    return logger.getStackTraceString(throwable);
  }

  static native_accurate_trace() {
    Log.d('native stack accurate:', Thread.backtrace((this as any).context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\t\n\t'));
  }

  static native_fuzzy_trace() {
    Log.d('native stack fuzz:', Thread.backtrace((this as any).context, Backtracer.FUZZY).map(DebugSymbol.fromAddress).join('\t\n\t'));
  }

}