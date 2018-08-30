module.exports = {
  verbose: true,
  transform: {
    '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js',
    '^.+\\.css$': '<rootDir>/node_modules/razzle/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)':
      '<rootDir>/node_modules/razzle/config/jest/fileTransform.js'
  },
  testMatch: [
    '<rootDir>/__tests__/**/*.(ts|js)?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).(ts|js)?(x)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  setupTestFrameworkScriptFile: './src/setupTests.js',
  moduleNameMapper: {
    '^.+\\.svg?$': '<rootDir>/__mocks__/svgTransform.js',
    '^.+\\.jpg?$': '<rootDir>/__mocks__/jpgTransform.js'
  }
}
