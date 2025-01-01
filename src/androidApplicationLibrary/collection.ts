'use strict';

/**
 * Set: HashSet TreeSet LinkedHashSet
 *
 * List: ArrayList LinkedList
 *
 * Deque: ArrayDeque 	LinkedList
 *
 * Map: HashMap LinkedHashMap HashTable TreeMap
 *
 * android: android.util.ArraySet, android.util.ArrayMap
 */

import { ClzHook, enumerateMethod, methodRoam } from '../utils/classMethodRoam.js';

// Java Collections Framework.
export const JCF: string[] = [
  // "java.util.HashSet",
  // "java.util.TreeSet",
  // "java.util.LinkedHashSet",
  // "java.util.ArrayList",
  // "java.util.LinkedList",
  // "java.util.ArrayDeque",
  'java.util.HashMap',
  'java.util.LinkedHashMap',
  // "java.util.HashTable",
  // "java.util.TreeMap",

  // "android.util.ArraySet",
  // "android.util.ArrayMap",
];

export function JCFHook(): void {
  JCF.forEach(c => {
    const collection = Java.use(c);
    enumerateMethod(collection).forEach(el => {
      methodRoam(collection[el], ClzHook);
    });
  });
}