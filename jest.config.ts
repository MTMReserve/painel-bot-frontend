// ======================================
// File: jest.config.ts
// ======================================

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.server.json', 
      },
    ],
  },

  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/'],

  moduleNameMapper: {
    '^@server/(.*)$': '<rootDir>/src/server/$1',
  },

  moduleFileExtensions: ['ts', 'js', 'json'],
  verbose: true,
};

export default config;
