'use strict';

/**
 *
 * @constructor
 */
export function GetAbstract() {
  Java.enumerateLoadedClassesSync().forEach((clz) => {

    Java.use(clz).class.getInterfaces().forEach((c: Java.Wrapper) => {
      console.log(`[Get Interface] class:${clz} interface:${c}`);
    });

    Java.use(clz).class.getSuperclass().forEach((c: Java.Wrapper) => {
      console.log(`[Get Superclass] class:${clz} SuperClass:${c}`);
    });
  });
}