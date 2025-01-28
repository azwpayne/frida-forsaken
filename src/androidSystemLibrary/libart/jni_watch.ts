'use strict';

// from https://github.com/Areizen/JNI-Frida-Hook

import { hook_dlopen } from '../libdl/dlope.js';
import {
  hook_get_string_region,
  hook_get_string_utf_region,
  hook_register_natives,
} from './utils.js';

/**
 * class created from struct JNINativeInterface:https://android.googlesource.com/platform/libnativehelper/+/master/include_jni/jni.h#129
 *
 * JNI Function:https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/functions.html
 */
const jni_struct_array = [
  'reserved0',
  'reserved1',
  'reserved2',
  'reserved3',
  'GetVersion',
  'DefineClass',
  'FindClass',
  'FromReflectedMethod',
  'FromReflectedField',
  'ToReflectedMethod',
  'GetSuperclass',
  'IsAssignableFrom',
  'ToReflectedField',
  'Throw',
  'ThrowNew',
  'ExceptionOccurred',
  'ExceptionDescribe',
  'ExceptionClear',
  'FatalError',
  'PushLocalFrame',
  'PopLocalFrame',
  'NewGlobalRef',
  'DeleteGlobalRef',
  'DeleteLocalRef',
  'IsSameObject',
  'NewLocalRef',
  'EnsureLocalCapacity',
  'AllocObject',
  'NewObject',
  'NewObjectV',
  'NewObjectA',
  'GetObjectClass',
  'IsInstanceOf',
  'GetMethodID',
  'CallObjectMethod',
  'CallObjectMethodV',
  'CallObjectMethodA',
  'CallBooleanMethod',
  'CallBooleanMethodV',
  'CallBooleanMethodA',
  'CallByteMethod',
  'CallByteMethodV',
  'CallByteMethodA',
  'CallCharMethod',
  'CallCharMethodV',
  'CallCharMethodA',
  'CallShortMethod',
  'CallShortMethodV',
  'CallShortMethodA',
  'CallIntMethod',
  'CallIntMethodV',
  'CallIntMethodA',
  'CallLongMethod',
  'CallLongMethodV',
  'CallLongMethodA',
  'CallFloatMethod',
  'CallFloatMethodV',
  'CallFloatMethodA',
  'CallDoubleMethod',
  'CallDoubleMethodV',
  'CallDoubleMethodA',
  'CallVoidMethod',
  'CallVoidMethodV',
  'CallVoidMethodA',
  'CallNonvirtualObjectMethod',
  'CallNonvirtualObjectMethodV',
  'CallNonvirtualObjectMethodA',
  'CallNonvirtualBooleanMethod',
  'CallNonvirtualBooleanMethodV',
  'CallNonvirtualBooleanMethodA',
  'CallNonvirtualByteMethod',
  'CallNonvirtualByteMethodV',
  'CallNonvirtualByteMethodA',
  'CallNonvirtualCharMethod',
  'CallNonvirtualCharMethodV',
  'CallNonvirtualCharMethodA',
  'CallNonvirtualShortMethod',
  'CallNonvirtualShortMethodV',
  'CallNonvirtualShortMethodA',
  'CallNonvirtualIntMethod',
  'CallNonvirtualIntMethodV',
  'CallNonvirtualIntMethodA',
  'CallNonvirtualLongMethod',
  'CallNonvirtualLongMethodV',
  'CallNonvirtualLongMethodA',
  'CallNonvirtualFloatMethod',
  'CallNonvirtualFloatMethodV',
  'CallNonvirtualFloatMethodA',
  'CallNonvirtualDoubleMethod',
  'CallNonvirtualDoubleMethodV',
  'CallNonvirtualDoubleMethodA',
  'CallNonvirtualVoidMethod',
  'CallNonvirtualVoidMethodV',
  'CallNonvirtualVoidMethodA',
  'GetFieldID',
  'GetObjectField',
  'GetBooleanField',
  'GetByteField',
  'GetCharField',
  'GetShortField',
  'GetIntField',
  'GetLongField',
  'GetFloatField',
  'GetDoubleField',
  'SetObjectField',
  'SetBooleanField',
  'SetByteField',
  'SetCharField',
  'SetShortField',
  'SetIntField',
  'SetLongField',
  'SetFloatField',
  'SetDoubleField',
  'GetStaticMethodID',
  'CallStaticObjectMethod',
  'CallStaticObjectMethodV',
  'CallStaticObjectMethodA',
  'CallStaticBooleanMethod',
  'CallStaticBooleanMethodV',
  'CallStaticBooleanMethodA',
  'CallStaticByteMethod',
  'CallStaticByteMethodV',
  'CallStaticByteMethodA',
  'CallStaticCharMethod',
  'CallStaticCharMethodV',
  'CallStaticCharMethodA',
  'CallStaticShortMethod',
  'CallStaticShortMethodV',
  'CallStaticShortMethodA',
  'CallStaticIntMethod',
  'CallStaticIntMethodV',
  'CallStaticIntMethodA',
  'CallStaticLongMethod',
  'CallStaticLongMethodV',
  'CallStaticLongMethodA',
  'CallStaticFloatMethod',
  'CallStaticFloatMethodV',
  'CallStaticFloatMethodA',
  'CallStaticDoubleMethod',
  'CallStaticDoubleMethodV',
  'CallStaticDoubleMethodA',
  'CallStaticVoidMethod',
  'CallStaticVoidMethodV',
  'CallStaticVoidMethodA',
  'GetStaticFieldID',
  'GetStaticObjectField',
  'GetStaticBooleanField',
  'GetStaticByteField',
  'GetStaticCharField',
  'GetStaticShortField',
  'GetStaticIntField',
  'GetStaticLongField',
  'GetStaticFloatField',
  'GetStaticDoubleField',
  'SetStaticObjectField',
  'SetStaticBooleanField',
  'SetStaticByteField',
  'SetStaticCharField',
  'SetStaticShortField',
  'SetStaticIntField',
  'SetStaticLongField',
  'SetStaticFloatField',
  'SetStaticDoubleField',
  'NewString',
  'GetStringLength',
  'GetStringChars',
  'ReleaseStringChars',
  'NewStringUTF',
  'GetStringUTFLength',
  'GetStringUTFChars',
  'ReleaseStringUTFChars',
  'GetArrayLength',
  'NewObjectArray',
  'GetObjectArrayElement',
  'SetObjectArrayElement',
  'NewBooleanArray',
  'NewByteArray',
  'NewCharArray',
  'NewShortArray',
  'NewIntArray',
  'NewLongArray',
  'NewFloatArray',
  'NewDoubleArray',
  'GetBooleanArrayElements',
  'GetByteArrayElements',
  'GetCharArrayElements',
  'GetShortArrayElements',
  'GetIntArrayElements',
  'GetLongArrayElements',
  'GetFloatArrayElements',
  'GetDoubleArrayElements',
  'ReleaseBooleanArrayElements',
  'ReleaseByteArrayElements',
  'ReleaseCharArrayElements',
  'ReleaseShortArrayElements',
  'ReleaseIntArrayElements',
  'ReleaseLongArrayElements',
  'ReleaseFloatArrayElements',
  'ReleaseDoubleArrayElements',
  'GetBooleanArrayRegion',
  'GetByteArrayRegion',
  'GetCharArrayRegion',
  'GetShortArrayRegion',
  'GetIntArrayRegion',
  'GetLongArrayRegion',
  'GetFloatArrayRegion',
  'GetDoubleArrayRegion',
  'SetBooleanArrayRegion',
  'SetByteArrayRegion',
  'SetCharArrayRegion',
  'SetShortArrayRegion',
  'SetIntArrayRegion',
  'SetLongArrayRegion',
  'SetFloatArrayRegion',
  'SetDoubleArrayRegion',
  'RegisterNatives',
  'UnregisterNatives',
  'MonitorEnter',
  'MonitorExit',
  'GetJavaVM',
  'GetStringRegion',
  'GetStringUTFRegion',
  'GetPrimitiveArrayCritical',
  'ReleasePrimitiveArrayCritical',
  'GetStringCritical',
  'ReleaseStringCritical',
  'NewWeakGlobalRef',
  'DeleteWeakGlobalRef',
  'ExceptionCheck',
  'NewDirectByteBuffer',
  'GetDirectBufferAddress',
  'GetDirectBufferCapacity',
  'GetObjectRefType',
] as const;

type jni_struct_array_name = typeof jni_struct_array[number];

const library_name = 'libsecure_lib.so'; // ex: libsqlite.so
const function_name = 'JNI_OnLoad'; // ex: JNI_OnLoad
const debug_flag = false;
const register_flag = false;

export function hook_jni(): void {
  // if (library_name === '' || function_name === '') {
  //   console.log('[-] You must provide a function name and a library name to hook');
  // } else {
  hook_dlopen(library_name, function () {
    watch_jni(library_name, function_name);
    // console.log(function_name);
  });
  // }
}

/**
 * Function that will process the JNICall after calculating it from the jnienv pointer in args[0]
 * @param library_name {string}
 * @param function_name {}
 */
function watch_jni(library_name: string, function_name: string) {

  // To get the list of exports
  Process.getModuleByName(library_name).enumerateExports().forEach(symbol => {
    // Module.enumerateExports(library_name).forEach(function (symbol:ModuleExportDetails) {
    if (symbol.name === function_name) {
      console.log(`[...] Hooking ${symbol.address}:  ${library_name}/${function_name}`);

      Interceptor.attach(symbol.address, {
        onEnter: function () {
          const jnienv_addr = Java.vm.tryGetEnv().handle.readPointer();

          console.log(`[+] Hooked successfully, JNIEnv base adress :${jnienv_addr}`);
          /**
           * Here you can choose which function to hook
           * Either you hook all to have an overview of the function called
           */
          if (debug_flag) {
            hook_all(jnienv_addr);
          }

          /**
           * Either you hook the one you want by precising what to do with it
           */

          hook_get_string_region(getJNIFunctionAdress(jnienv_addr, 'GetStringRegion'));
          // hook_get_string_utf_(getJNIFunctionAdress(jnienv_addr, "GetStringRegion"));
          hook_get_string_utf_region(getJNIFunctionAdress(jnienv_addr, 'GetStringUTFRegion'));

          if (register_flag) {
            hook_register_natives(getJNIFunctionAdress(jnienv_addr, 'RegisterNatives'));
          }

        },
      });
    }
  });
}

/**
 * Hook all function to have an overview of the function called
 * @param jnienv_addr
 */
function hook_all(jnienv_addr: NativePointer) {
  jni_struct_array.forEach(function (func_name) {
    // Calculating the address of the function
    if (!func_name.includes('reserved')) {
      console.log('[...] Hooking : ' + func_name);
      const func_addr = getJNIFunctionAdress(jnienv_addr, func_name);
      Interceptor.attach(func_addr, {
        onEnter() {
          console.log('[+] Entered : ' + func_name);
        },
      });
    }
  });
}

/**
 * Calculate the given funcName address from the JNIEnv pointer
 * @param jnienv_addr
 * @param func_name
 * @returns
 */
function getJNIFunctionAdress(jnienv_addr: NativePointer, func_name: jni_struct_array_name) {
  const offset = jni_struct_array.indexOf(func_name) * Process.pointerSize;

  // console.log("offset : 0x" + offset.toString(16))

  return jnienv_addr.add(offset).readPointer();
}