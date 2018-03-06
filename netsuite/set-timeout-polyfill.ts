function definePolyfill(global: any) {
  // tslint:disable:only-arrow-functions
  global.setTimeout = function(callable: () => {}, _: any) {
    return callable.apply(global, [].slice.call(arguments, 2));
  };
  // tslint:enable:only-arrow-functions
}

let local: any;

if (typeof exports !== "undefined") {
  local = exports;
} else if (typeof global !== "undefined") {
  local = global;
} else if (typeof self !== "undefined") {
  local = self;
} else {
  try {
    local = Function("return this")();
  } catch (e) {
    throw new Error("setTimeout polyfill failed.");
  }
}

let P = local.Promise;

if (P) {
  let promiseToString: string | null = null;

  try {
    promiseToString = Object.prototype.toString.call(local.setTimeout);
  } catch (e) {
    /** om nom nom */
  }

  if (promiseToString !== "[object Function]") {
    definePolyfill(local);
  }
}
