import { defineConfig } from 'vite';
import path from 'path';
import copy from 'rollup-plugin-copy';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'publish',
    lib: {
      entry: './src/index.ts',
      name: 'CompreFace',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['axios'],
      output: {
        globals: {
          axios: 'axios',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    dts({ rollupTypes: true }),
    copy({
      targets: [
        { src: 'package.json', dest: 'publish' },
        { src: 'README.md', dest: 'publish' },
        { src: 'LICENSE', dest: 'publish' },
      ],
      hook: 'writeBundle',
    }),
  ],
});
