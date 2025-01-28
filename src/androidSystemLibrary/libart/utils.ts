'use strict';

import { Log } from '../../utils/logger.js';
import { prettyMethod } from './stdstring';

// https://android.googlesource.com/platform/libnativehelper/+/master/include_jni/jni.h
// https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/functions.html
// https://github.com/frida/frida-java-bridge

//// Class Operations
/**
 * jclass DefineClass(JNIEnv *env, const char *name, jobject loader, const jbyte *buf, jsize bufLen)
 * @param symbol
 * @see https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/functions.html#DefineClass
 */
export function hook_DefineClass(symbol: NativePointer) {
  if (symbol === null || !symbol) {
    Log.e(`hook_DefineClass`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter(args): void {
      const class_name = args[1].readCString();
      const class_loader = args[2].readCString();
      console.log(class_name);
      console.log(class_loader);
    },
  });

}

/**
 *
 * @param symbol
 */
export function hook_find_class(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_find_class`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter: function (args) {
      const class_name = args[1].readCString();
      if (class_name
        && !class_name.includes('java/')
        && !class_name.includes('android/')
      ) {
        console.log('env->FindClass("' + +'")');
      }
    },
  });
}

// todo impl hook_get_superclass

//// Exceptions
// todo impl

//// Global and Local References
// todo impl

//// Weak Global References
// todo impl

//// Object Operations
// todo impl

//// Accessing Fields of Objects
// todo impl

//// Calling Instance Methods
// todo impl

//// Accessing Static Fields
// todo impl

//// Calling Static Methods

//// String Operations
export function hook_NewString(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_new_string`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter: function (args) {
      const character = args[1].readCString();
      if (character) {
        console.log('env->NewString("' + character + '")');
      }
    },
  });
}

export function hook_GetStringLength(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_get_string_length`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter(args): void {
      const character = args[1].readCString();
      if (character) {
        console.log('env->GetStringLength("' + character + '")');
      }
    },
  });
}

export function hook_GetStringChars(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_get_string_chars`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter(args): void {
      const character = args[1].readCString();
      console.log(character);
      // if (character) {
      //   console.log('env->hook_get_string_chars("' + character + '")');
      // }
    },
  });
}

export function hook_ReleaseStringChars(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_release_string_chars`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter(args): void {
      const character = args[1].readCString();
      if (character) {
        console.log('env->ReleaseStringChars("' + character + '")');
      }
    },
  });
}

export function hook_NewStringUTF(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_new_string`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter: function (args) {
      const character = args[1].readCString();
      if (character) {
        console.log('env->NewStringUTF("' + character + '")');
      }
    },
  });
}

export function hook_GetStringUTFLength(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_new_string`, `Unexpected value occurs: ${symbol}`);
  }

  Interceptor.attach(symbol, {
    onEnter(args): void {
      this.arg1 = args[1].readCString();
    }, onLeave(retval): void {
      const result = retval.toString(10);
      console.log(`env->GetStringUTFLength("${this.arg1}") length: ${result}`);
    },
  });
}

export function hook_GetStringUTFChars(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_get_string_utf_chars`, `Unexpected value occurs: ${symbol}`);
  }

  Interceptor.attach(symbol, {
    onEnter(args): void {
      const character = args[1].readCString();
      if (character) {
        console.log('env->GetStringUTFChars("' + character + '")');
      }
    },
  });
}

export function hook_ReleaseStringUTFChars(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_release_string_utf_chars`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter(args): void {
      const character = args[1].readCString();
      if (character) {
        console.log('env->ReleaseStringUTFChars("' + character + '")');
      }
    },
  });
}

export function hook_GetStringRegion(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_get_string_region`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter(args): void {
      const character = args[1].readCString();
      if (character) {
        console.log('env->GetStringRegion("' + character + '")');
      }
    },
  });
}

export function hook_GetUTFRegion(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_get_utf_region`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter(args): void {
      const character = args[1].readCString();
      if (character) {
        console.log('env->GetStringUTFRegion("' + character + '")');
      }
    },
  });
}

export function hook_GetStringUTFRegion(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_get_string_utf_region`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter(args): void {
      const character = args[1].readCString();
      if (character) {
        console.log('env->GetStringUTFRegion("' + character + '")');
      }
    },
  });
}

export function hook_GetStringCritical(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_get_string_critical`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter(args): void {
      const character = args[1].readCString();
      if (character) {
        console.log('env->GetStringCritical("' + character + '")');
      }
    },
  });
}

export function hook_ReleaseStringCritical(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_release_string_critical`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter(args): void {
      const character = args[1].readCString();
      if (character) {
        console.log('env->ReleaseStringCritical("' + character + '")');
      }
    },
  });
}

//// Array Operations
// todo impl

//// Registering Native Methods
/**
 *
 * @param symbol
 * @see https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/functions.html#registering_native_methods
 *
 * ```c
 *   jint RegisterNatives(jclass clazz, const JNINativeMethod* methods,
 *         jint nMethods)
 *     { return functions->RegisterNatives(this, clazz, methods, nMethods); }
 *
 *     typedef struct {
 *     const char* name;
 *     const char* signature;
 *     void*       fnPtr;
 * } JNINativeMethod;
 * ```

 */
export function hook_RegisterNatives(symbol: NativePointer): void {
  if (symbol === null || !symbol) {
    Log.e(`hook_register_natives`, `Unexpected value occurs: ${symbol}`);
  }
  Interceptor.attach(symbol, {
    onEnter: function (args) {
      const class_name = Java.vm.tryGetEnv().getClassName(args[1]);
      for (let i = 0; i < parseInt(args[3].toString(10)); i++) {
        const fn_name = args[2].add(i * Process.pointerSize * 3).readPointer().readCString();
        const fn_signature = args[2].add(
          i * Process.pointerSize * 3 + Process.pointerSize).readPointer().readCString();
        const fn_ptr = args[2].add(
          i * Process.pointerSize * 3 + Process.pointerSize * 2).readPointer();
        console.log(
          `RegisterNatives->${class_name}_${fn_name}${fn_signature}\tfn_ptr:${fn_ptr}\tfnOffset:${DebugSymbol.fromAddress(
            fn_ptr)}\tcallee:${DebugSymbol.fromAddress(this.returnAddress)}`);
      }
    },
  });
}

//// Monitor Operations
// todo impl

//// NIO Support
// todo impl

//// Reflection Support
// todo impl

export function hook_ArtMethod(symbol: NativePointer) {
  Interceptor.attach(symbol, {
    onEnter(args) {
      const method_name = prettyMethod(args[0], 0);
      if (!(method_name.indexOf('java.') == 0 || method_name.indexOf('android.') == 0)) {
        console.log('ArtMethod Invoke:' + method_name + '  called from:\n' +
          Thread.backtrace(this.context, Backtracer.ACCURATE)
          .map(DebugSymbol.fromAddress).join('\n') + '\n');
      }
    },
  });
}