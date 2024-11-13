module.exports = {
    transform: {
      "^.+\\.js$": "babel-jest"
    },
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ["js", "jsx"],
    setupFilesAfterEnv: ['./tests/setupTests.js'], 
  };
  