module.exports = {
    transform: {
      "^.+\\.js$": "babel-jest"
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx"],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  };
  