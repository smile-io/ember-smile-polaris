import js from '@eslint/js';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import nodePlugin from 'eslint-plugin-n';
import qunitPlugin from 'eslint-plugin-qunit';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // Global ignores (replaces .eslintignore)
  {
    ignores: [
      'blueprints/*/files/',
      'vendor/',
      'dist/',
      'tmp/',
      'bower_components/',
      'node_modules/',
      'coverage/',
      '.node_modules.ember-try/',
      'bower.json.ember-try',
      'package.json.ember-try',
    ],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // Ember recommended rules (using FlatCompat for legacy config)
  ...compat.extends('plugin:ember/recommended'),

  // Main configuration for all JS files
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: [
            [
              '@babel/plugin-proposal-decorators',
              { decoratorsBeforeExport: true },
            ],
          ],
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // Temporary while upgrading to Ember Octane & Glimmer components
      'ember/no-get': 'off',
      'ember/no-mixins': 'off',
      'ember/no-classic-components': 'off',
      'ember/no-classic-classes': 'off',
      'ember/classic-decorator-hooks': 'off',
      'ember/classic-decorator-no-classic-methods': 'off',
      'ember/require-tagless-components': 'off',
      'ember/no-computed-properties-in-native-classes': 'off',
      'ember/no-component-lifecycle-hooks': 'off',
      'ember/no-runloop': 'off',
    },
  },

  // ESLint config file (ESM, devDependencies allowed)
  {
    files: ['eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'n/no-unpublished-import': 'off',
    },
  },

  // Node files configuration (CommonJS)
  {
    files: [
      '.prettierrc.js',
      '.template-lintrc.js',
      'ember-cli-build.js',
      'index.js',
      'testem.js',
      'blueprints/*/index.js',
      'config/**/*.js',
      'tests/dummy/config/**/*.js',
    ],
    ...nodePlugin.configs['flat/recommended'],
    languageOptions: {
      parser: babelParser,
      sourceType: 'script',
      parserOptions: {
        requireConfigFile: false,
      },
      globals: {
        ...globals.node,
      },
    },
  },

  // Deprecation workflow file (browser globals, not node)
  {
    files: ['tests/dummy/config/deprecation-workflow.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // Test files configuration
  {
    files: ['tests/**/*-test.{js,ts}'],
    ...qunitPlugin.configs['flat/recommended'],
  },

  // Prettier configuration (should be last to override other formatting rules)
  prettierPlugin,
];
