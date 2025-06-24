import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import * as pluginImportX from 'eslint-plugin-import-x';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  // eslint-disable-next-line import-x/no-named-as-default-member
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  {
    plugins: { 'simple-import-sort': simpleImportSort },
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-undef': 'off',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'import-x/first': 'warn',
      'import-x/newline-after-import': 'warn',
      'import-x/no-duplicates': 'warn',
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        // eslint-disable-next-line import-x/no-named-as-default-member
        parser: ts.parser,
        svelteConfig,
      },
    },
  },
);
