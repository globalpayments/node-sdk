/* eslint-env node */
module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  root: true,
  overrides: [
    {
      files: ["./src/*.ts"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      rules: {
        "@typescript-eslint/tslint/config": ["off"],
      },
    },
  ],
  rules: {
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-misused-new": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
        ObjectExpression: 1,
        MemberExpression: 1,
        FunctionDeclaration: { body: 1, parameters: 2 },
        ignoredNodes: ["ConditionalExpression"],
      },
    ],
  },
};
