// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import global from 'globals'

export default defineConfig([
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions:{
            globals: {
                ...global.browser,
                ...global.node,
            },
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "error"
        }
    }
]);