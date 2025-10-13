import js from '@eslint/js';

export default [
  // Ignore files (equivalent to .eslintignore)
  {
    ignores: ['public/**/*', 'node_modules/**/*', '.cache/**/*'],
  },

  // Base configuration for all JS files
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        // Node.js globals for build scripts
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        // React globals
        React: 'readonly',
      },
    },
    rules: {
      // ESLint recommended rules
      ...js.configs.recommended.rules,

      // Code style rules (Airbnb-inspired but simplified)
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': ['error', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^React$', // Allow React to be imported but not used
      }],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'max-len': ['error', { 'code': 120, 'ignoreUrls': true }], // Increased to 120

      // React-specific rules (basic ones without plugin dependencies)
      'no-undef': 'error',

      // Custom rules from original config
      'no-console': 'off',
    },
  },
];
