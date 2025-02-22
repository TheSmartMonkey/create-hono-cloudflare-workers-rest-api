export default {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: ['.*__snapshots__/.*', '.*/index.ts', '.*/openapi.ts', '.*/schemas/.*'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'lcov', 'clover', 'cobertura'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  reporters: ['default'],
  roots: ['<rootDir>'],
  runner: 'groups',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/', // Ignore tests in the dist folder
  ],
};
