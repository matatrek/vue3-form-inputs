import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@headless': path.resolve(__dirname, './src/headless'),
      '@composables': path.resolve(__dirname, './src/composables'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@theme': path.resolve(__dirname, './src/theme'),
    }
  },
  root: './playground',
  server: {
    port: 5177
  },
  build: {
    outDir: '../dist', 
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Vue3FormInputs',
      fileName: (format) => `vue3-form-inputs.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
