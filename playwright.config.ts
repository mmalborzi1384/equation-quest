import { defineConfig } from '@playwright/test';

// Sandboxed/CI environments can point Playwright at a pre-provisioned Chromium
// binary and pass extra launch flags without editing this config.
const extraArgs = (process.env.EQ_CHROMIUM_ARGS ?? '')
  .split(',')
  .map((arg) => arg.trim())
  .filter(Boolean);

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:5173/equation-quest/',
    browserName: 'chromium',
    launchOptions: {
      ...(process.env.EQ_CHROMIUM_PATH ? { executablePath: process.env.EQ_CHROMIUM_PATH } : {}),
      args: [
        ...extraArgs,
        ...(process.env.EQ_WEBGL === '1'
          ? [
              '--enable-webgl',
              '--use-gl=angle',
              '--use-angle=swiftshader',
              '--enable-unsafe-swiftshader',
              '--ignore-gpu-blocklist',
            ]
          : []),
      ],
    },
  },
  webServer: {
    command: 'npm run dev -- --port 5173',
    url: 'http://127.0.0.1:5173/equation-quest/',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
