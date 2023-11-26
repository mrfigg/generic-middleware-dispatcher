module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.*(?<=^|\\W)types\\.(test|spec)\\.tsx?$': 'dts-jest/transform',
  },
  testEnvironment: 'node',
  testRegex: '/tests/.*\\.(test|spec)\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
