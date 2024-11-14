import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  // Added reporter configurations
  verbose: true,
  reporters: [
    "default",
    ["jest-summary-reporter", { "failuresOnly": true }],
    ["jest-junit", {
      outputDirectory: "./test-results",
      outputName: "junit.xml",
    }]
  ],
  // Better error display
  collectCoverage: true,
  coverageReporters: ["text", "lcov"],
  // Display individual test results
  notify: true,
  // Show test execution time
  testLocationInResults: true,
  // Cleaner error stack traces
  errorOnDeprecated: true
};

export default config;