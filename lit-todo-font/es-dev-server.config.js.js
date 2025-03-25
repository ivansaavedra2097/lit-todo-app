import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    port: 8000,
    open: true,
    watch: true,
    compatibility: 'auto',
    nodeResolve: true,
    moduleDirs: ['node_modules'],
    rootDir: '.',
    plugins: [
      resolve({
        browser: true, // Indica que el entorno es un navegador
        preferBuiltins: false, // Evita problemas con módulos nativos de Node.js
      }),
      commonjs(),
    ],
  };