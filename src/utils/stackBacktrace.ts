import { Log } from "./logger.js";

export class StackBackTrace {

  /**
   * @deprecated Insufficient stability, not recommended for use
   */
  static thread_stack() {
    const thread = Java.use("java.lang.Thread").$new();
    return thread.currentThread().getStackTrace();

    // Log.d("thread_stack", stack.map((args: string) => {
    //   return "\r\n\t" + args;
    // }));
  }

  static exception_stack() {
    const Exception = Java.use("java.lang.Exception");
    const ins = Exception.$new("Exception");
    const stack_trace = ins.getStackTrace();

    let result: string = "";
    if (stack_trace) {
      for (let i = 0; i < stack_trace.length; i++) {
        const str = stack_trace[i].toString();
        result += str + "\r\n";
      }
    }

    Exception.$dispose();
    return result;
  }

  /**
   * console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()))
   */
  static androidLog() {
    const logger = Java.use("android.util.Log");
    const throwable = Java.use("java.lang.Throwable").$new();
    // throwable.$dispose();
    logger.$dispose();
    return logger.getStackTraceString(throwable);
  }

  static native_accurate_trace() {
    Log.d("native stack accurate:", Thread.backtrace((this as any).context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\t\n\t"));
  }

  static native_fuzzy_trace() {
    Log.d("native stack fuzz:", Thread.backtrace((this as any).context, Backtracer.FUZZY).map(DebugSymbol.fromAddress).join("\t\n\t"));
  }

  // console.log(' called from:\n' +Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');//SO打印堆栈


}