// eslint-disable

module.exports = {
  transform: {
    '.(js|jsx|ts|tsx)': '@sucrase/jest-plugin'
  },
  testEnvironment: 'node',
  preset: 'ts-jest' // use this if you are using TypeScript
  // globalSetup: './jest.global-setup.js' // optional: will be called once before all tests are executed
  // globalTeardown: './jest.global-teardown.js' // optional: will be called once after all tests are executed
}
