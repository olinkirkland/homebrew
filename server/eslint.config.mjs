// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    ...tseslint.configs.recommended,
    eslint.configs.recommended,
    {
        env: {
            mocha: true, // Add Mocha environment
            node: true,
            es6: true,
        },
        globals: {
            describe: 'readonly',
            it: 'readonly',
            before: 'readonly',
            after: 'readonly',
            beforeEach: 'readonly',
            afterEach: 'readonly',
        },
    },
];
