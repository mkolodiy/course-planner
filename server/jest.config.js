module.exports = {
  verbose: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/testSetup.js'],
  collectCoverage: true,
  coverageReporters: ['html']
};
