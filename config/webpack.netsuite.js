const path = require("path");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");

const resolve = (p) => path.resolve(__dirname, p);

module.exports = {
  entry: resolve("../src/index.ts"),
  output: {
    filename: "lib/netsuite/globalpayments.api.js",
    libraryTarget: "amd",
  },
  resolve: {
    alias: {
      "./https-wrapper$": resolve("../netsuite/https.js"),
      "./Errors$": resolve("../netsuite/errors.ts"),
    },
    extensions: [".ts", ".js"],
    plugins: [
      new TsConfigPathsPlugin({
        configFileName: "tsconfig.json",
        compliler: "typescript",
      }),
    ],
  },
  module: {
    loaders: [{ test: /\.ts$/, loader: "awesome-typescript-loader" }],
  },
};
