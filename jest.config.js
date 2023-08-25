const { resolve } = require('path');
const root = resolve(__dirname);
module.exports = {
  rootDir: root,
  displayName: 'root-tests',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  collectCoverageFrom: ["src/**/*.ts"],
  testEnvironment: 'node',
  preset: 'ts-jest',
  
};