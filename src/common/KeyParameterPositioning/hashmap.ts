'use strict';

import { Log } from '../../../src_agent';

export function hashmap() {
  const hashmap = Java.use('java.util.HashMap');

  // get
  hashmap['get'].overloads.implementation = function () {
    Log.i('[KeyParameterPositioning]-[HashMap]', ``);
  };

  // put
}