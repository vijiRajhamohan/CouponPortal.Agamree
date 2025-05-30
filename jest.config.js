// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path');
const artifacts = process.env.TF_BUILD ? process.env.BUILD_ARTIFACTSTAGINGDIRECTORY : 'artifacts/';

module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            diagnostics: false,
        },
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^~/(.*)$': '<rootDir>/$1',
    },
    snapshotSerializers: ['jest-serializer-vue'],
    // testMatch: ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
    testMatch: ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)'],
    testURL: 'http://localhost/',
    setupFiles: ['./tests/unit/setup.js'],
    collectCoverage: false,
    coverageDirectory: join(artifacts, 'coverage'),
    coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
    collectCoverageFrom: ['**/*.{ts,tsx,vue}', '!node_modules/**'],
    cacheDirectory: '.cache',
    reporters: [
        'default',
        ['jest-junit', { suiteName: 'jest tests', outputDirectory: join(artifacts, 'tests'), outputName: 'jest.junit' }],
    ],
};
