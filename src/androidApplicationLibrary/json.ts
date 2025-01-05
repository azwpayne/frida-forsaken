'use strict';

/**
 * org.json.JSONObject
 */
import { ClzHook, enumerateMethod, methodRoam } from '../utils/classMethodRoam';

export function AndroidLog() {
  const JSONObject = Java.use('org.json.JSONObject');
  enumerateMethod(JSONObject).forEach(el => {
    methodRoam(JSONObject[el], ClzHook);
  });
}