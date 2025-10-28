import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // @ts-expect-error - Vite plugin type conflict between vite and vitest
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './react/src/test/setup.ts',
  },
});