/* eslint-disable node/no-deprecated-api */
/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = wallaby => {
    const fs = require('fs');
    const path = require('path');
    process.env.VUE_CLI_BABEL_TARGET_NODE = true;
    process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

    // const compiler = wallaby.compilers.babel({ presets: [['@vue/app', { modules: 'commonjs' }]] });

    const compiler = wallaby.compilers.babel({
        presets: [['@babel/env', { targets: { node: 'current' } }], '@babel/typescript'],
        plugins: [
            'babel-plugin-transform-typescript-metadata',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            'babel-plugin-jest-hoist',
        ],
    });

    const defaults = fs
        .readdirSync(__dirname)
        .filter(z => z !== 'node_modules')
        .map(z => path.join(z, '**/*.{ts,tsx,vue}'));

    return {
        workers: {
            initial: 4,
            regular: 3,
        },

        files: [
            ...defaults,
            '!tests/**/*.spec.ts',
            'jest.config.js',
            'tests/unit/**/*.js',
            'settings/**/*.{json,env,yml,yaml}',
            'tsconfig.json',
            'package.json',
        ],

        filesWithNoCoverageCalculated: ['stargate/**/*.ts'],

        tests: ['tests/unit/**/*.spec.ts'],

        env: {
            type: 'node',
            runner: 'node',
        },

        compilers: {
            '**/*.js?(x)': compiler,
            '**/*.ts?(x)': wallaby.compilers.typeScript({
                module: 'commonjs',
            }),
            '**/*.vue': vueCompiler(compiler),
        },

        preprocessors: {
            '**/*.vue': file => {
                const jestConfig = require('./jest.config');
                jestConfig.transform = {};
                return require('vue-jest').process(file.content, file.path, jestConfig);
            },
        },

        setup(wallaby) {
            const jestConfig = require('./jest.config');
            jestConfig.transform = {};
            wallaby.testFramework.configure(jestConfig);

            const handler = require.extensions['.json'];
            require.extensions['.json'] = (m, filename) => {
                if (filename.includes('tsconfig')) {
                    const def = require.extensions['.json'];
                    delete require.extensions['.json'];
                    const r = require('tsconfig');
                    m.exports = r;
                    require.extensions['.json'] = def;
                    return;
                }

                handler(m, filename);
            };

            if (global._tsconfigPathsRegistered) return;
            const tsconfig = require('tsconfig');
            const tsConfigPaths = require('tsconfig-paths');
            const { config } = tsconfig.loadSync(wallaby.localProjectDir, 'tsconfig.json');
            tsConfigPaths.register({
                baseUrl: config.compilerOptions.baseUrl,
                paths: config.compilerOptions.paths,
            });
            global._tsconfigPathsRegistered = true;
        },

        testFramework: 'jest',

        debug: false,
    };
};

function vueCompiler(scriptCompiler) {
    const compiler = require('vue-template-compiler');
    const parseVueComponent = compiler.parseComponent.bind(compiler);

    // patching the original function because otherwise
    // vue-loader creates a second line padding
    compiler.parseComponent = function(content, opts) {
        return parseVueComponent(content);
    };

    return function(file) {
        const output = parseVueComponent(file.content, { pad: 'line' });
        if (!output.script) return { code: file.content, noScript: true };

        const compilationResult = scriptCompiler({
            path: file.path + '.ts',
            content: output.script.content,
        });

        compilationResult.scriptRange = {
            start: output.script.start,
            end: output.script.start + compilationResult.code.length,
        };

        compilationResult.code =
            file.content.substring(0, compilationResult.scriptRange.start) +
            compilationResult.code +
            file.content.substring(output.script.end);

        return compilationResult;
    };
}
