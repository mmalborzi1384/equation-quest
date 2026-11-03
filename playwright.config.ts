import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:5173/equation-quest/',
    browserName: 'chromium',
    launchOptions: process.env.EQ_CHROMIUM_PATH
      ? {
          executablePath: process.env.EQ_CHROMIUM_PATH,
          args:
            process.env.EQ_WEBGL === '1'
              ? [
                  '--enable-webgl',
                  '--use-gl=angle',
                  '--use-angle=swiftshader',
                  '--enable-unsafe-swiftshader',
                  '--ignore-gpu-blocklist',
                ]
              : [],
        }
      : undefined,
  },
  webServer: {
    command: 'npm run dev -- --port 5173',
    url: 'http://127.0.0.1:5173/equation-quest/',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
