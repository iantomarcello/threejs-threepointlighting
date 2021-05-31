import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'ts/setupThreePointLighting.ts',
  output: [
    { file: 'js/cjs/setupThreePointLighting.js', format: 'cjs', plugins: [terser()]},
    { file: 'js/esm/setupThreePointLighting.js', format: 'es', plugins: [terser()] },
  ],
  plugins: [
    typescript(),
  ]
};
