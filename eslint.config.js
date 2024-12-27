import pluginJs from '@eslint/js';
// import pluginImport from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import SortKeysFix from 'eslint-plugin-sort-keys-fix';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}']
  },
  {
    languageOptions: { globals: globals.builtin }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser }
    }
  },
  {
    plugins: {
      // pluginImport,
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': SortKeysFix,
      'unused-imports': unusedImports
    },
    rules: {
      'comma-dangle': ['error', 'never'],
      'comma-spacing': 2,
      'computed-property-spacing': 2,
      'eol-last': ['error'],
      'func-call-spacing': [2, 'never'],
      indent: ['error', 2],
      'keyword-spacing': 2,
      'no-console': 0,
      'no-extra-parens': 'error',
      'no-extra-semi': 'error',
      'no-multi-spaces': 2,
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      'no-trailing-spaces': 'error',
      'no-unexpected-multiline': 'error',
      'no-unneeded-ternary': 2,
      'no-unreachable': 'error',
      'no-unused-vars': 'off',
      quotes: [1, 'single'],
      semi: ['error', 'always'],
      'semi-spacing': ['error', { after: true, before: false }],
      'semi-style': ['error', 'last'],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-keys': ['error', 'asc', { natural: true }],
      'sort-keys-fix/sort-keys-fix': 2,
      'space-in-parens': ['error', 'never'],
      'unicorn/filename-case': [0, {
        'case': 'pascalCase', 'ignore': [
          'setting.ts',
          'index.ts',
          'main.ts',
          '^env',
          '^(B|b)az',
          String.raw`\.d\.ts$`,
          String.raw`\.config\.(js|ts)$`,
          /^vendor/i
        ]
      }],
      'unicorn/prevent-abbreviations': 'off',
      // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 2,
      'vue/attributes-order': [
        'error',
        {
          alphabetical: true,
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'CONTENT',
            'EVENTS'
          ]
        }
      ],
      'vue/first-attribute-linebreak': ['error', {
        'multiline': 'below',
        'singleline': 'ignore'
      }],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          'multiline': 'always',
          'selfClosingTag': {
            'multiline': 'always',
            'singleline': 'never'
          },
          'singleline': 'never'
        }
      ],
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': [
        'error',
        {
          multiline: {
            max: 1
          },
          singleline: {
            max: 1
          }
        }
      ],
      'vue/multi-word-component-names': 'off',
      'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
      'vue/no-v-html': 0,
      'vue/singleline-html-element-content-newline': [
        'error', {
          'ignoreWhenEmpty': true,
          'ignoreWhenNoAttributes': true,
          'ignores': ['pre', 'textarea']
        }
      ],
      'vue/space-in-parens': 'error'
    }
  }
];
