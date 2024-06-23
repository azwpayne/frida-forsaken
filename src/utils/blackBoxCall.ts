"use strict";

interface rpcDict {
  [key: string]: string;
}

function StaticMethod(clz: Java.Wrapper, args: string[]): rpcDict {
  let result: rpcDict = {};
  Java.perform(function () {
    result["StaticMethodResult"] = clz.method_name(...args);
  });
  return result;
}

function instanceMethod(className: string, args: string[]): rpcDict {
  console.log("Script loaded successfully, start hook...");
  let result: rpcDict = {};
  Java.perform(function () {
    console.log("Inside java perform function...");
    Java.choose(className, {
      onComplete(): void {
      },
      onMatch(instance: Java.Wrapper): EnumerateAction {
        result["instanceMethodResult"] = instance.method_name(...args);
        return "stop";
      },
    });
  });
  return result;
}

rpc.exports = {
  staticMethod: StaticMethod,
  instanceMethod: instanceMethod,
};


