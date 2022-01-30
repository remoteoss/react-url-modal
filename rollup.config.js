import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import packageJson from './package.json';

const commonPlugins = [
  external(),
  resolve(),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    declarationDir: 'types/',
  }),
  terser(),
];

const terserOptions = {
  treeshake: {
    propertyReadSideEffects: false,
  },
};

export default [
  {
    ...terserOptions,
    input: 'src/StyledModal/index.ts',
    output: [
      {
        file: 'dist/Modal/index.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [...commonPlugins, postcss()],
  },

  {
    ...terserOptions,
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: 'react-url-modal',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: commonPlugins,
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
  {
    input: 'dist/Modal/types/StyledModal/index.d.ts',
    output: [{ file: 'dist/Modal/index.d.ts', format: 'esm' }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
