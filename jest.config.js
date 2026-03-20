export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/problems/**/*.test.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1',
  },
}
