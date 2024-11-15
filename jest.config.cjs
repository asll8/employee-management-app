module.exports = {
    transform: {
      "^.+\\.js$": "babel-jest"
    },
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ["js", "jsx"],
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'], 
    collectCoverage: true,
    coverageDirectory: "<rootDir>/coverage",
    globals: {
      "babel-jest": {
        useESModules: true
      }
    }
  };
  