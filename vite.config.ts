import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/equation-quest/',
  server: { host: '0.0.0.0', allowedHosts: true },
  // autoAnimate is only reached through lazy lesson/level/game chunks. Pre-bundle
  // it up front so discovering it during a route reload cannot trigger Vite's
  // on-demand dependency optimization (which forces a full page reload).
  optimizeDeps: { include: ['@formkit/auto-animate/react'] },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: true,
  },
});
