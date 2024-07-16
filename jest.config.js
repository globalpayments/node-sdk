module.exports = {
    preset: "ts-jest",
    verbose: true,
    runner: "jest-runner",
    testTimeout: 900000,
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
}