import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'graphify-out/**',
      '.specify/**',
      '.agents/**',
    ],
  },
  ...tseslint.configs.recommended,
];
