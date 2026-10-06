import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: 'src/overwebs-main-menu.js',
      formats: ['es'],
      fileName: () => 'overwebs-main-menu.js'
    },
    rollupOptions: {
      external: [/^gluonjs(\/.*)?$/, /^overwebs-fonts(\/.*)?$/],
      // gluonjs derives the tag name from the class name, so keep it intact
      output: { keepNames: true }
    }
  },
  test: {
    environment: 'happy-dom',
    passWithNoTests: true
  }
});
