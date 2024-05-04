export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Add your existing transform for JavaScript files
  },
  moduleNameMapper: {
    '\\.(mp4)$': '<rootDir>/tests/mock/fileMock.js',
  },
};
