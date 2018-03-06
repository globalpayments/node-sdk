const fs = require("fs");
const path = require("path");

const fileName = path.resolve(
  __dirname,
  "..",
  "lib",
  "netsuite",
  "globalpayments.api.js",
);
let script = fs.readFileSync(fileName).toString();

script = script.replace(
  "define(function() { return /******/ (function(modules) { // webpackBootstrap",
  'define(["N/https", "N/log"], function(https, log) { return /******/ (function(modules) { // webpackBootstrap',
);
script = script.replace(
  "var setTimeoutFunc = setTimeout;",
  "var setTimeoutFunc = Promise._immediateFn;",
);
script = script.replace(
  "var globalSetTimeout = setTimeout;",
  "var globalSetTimeout = function(callable, any) {\n    return callable.apply(global, [].slice.call(arguments, 2));\n  };",
);
script = script.replace(/console\.(log|trace|warn)/g, "log.debug");
script = script.replace(/console\.(error)/g, "log.error");

fs.writeFileSync(fileName, script);
