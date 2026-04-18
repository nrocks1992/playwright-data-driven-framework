/**
 * playwright.config.js
 *
 * Configures Playwright to run the test suite in parallel across three
 * browser engines: Chromium, Firefox, and WebKit.
 *
 * Key settings:
 *  - fullyParallel: true   → individual tests within a file run in parallel
 *  - workers: undefined    → Playwright auto-selects the optimal worker count
 *                            based on available CPU cores
 *  - projects              → one entry per browser; Playwright spawns separate
 *                            worker pools for each project
 */

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Directory that Playwright scans for test files
  testDir: './tests',

  // Run tests within each file in parallel (not just file-level parallelism)
  fullyParallel: true,

  // Do not re-run failed tests in CI to keep feedback fast
  forbidOnly: !!process.env.CI,

  // Retry once on CI to guard against transient flakiness
  retries: process.env.CI ? 1 : 0,

  // Let Playwright choose the number of parallel workers automatically
  workers: process.env.CI ? 4 : undefined,

  // HTML report saved to playwright-report/
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    // Base URL so tests can use relative paths if needed
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',

    // Capture a screenshot only when a test fails
    screenshot: 'only-on-failure',

    // Record a video only when a test fails
    video: 'retain-on-failure',

    // Record traces only when retrying a failed test
    trace: 'on-first-retry',

    // Give each action up to 10 s before timing out
    actionTimeout: 10_000,

    // Give each navigation up to 30 s before timing out
    navigationTimeout: 30_000,
  },

  projects: [
    // ── Chromium (Google Chrome / Microsoft Edge engine) ────────────────────
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // ── Firefox (Gecko engine) ───────────────────────────────────────────────
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // ── WebKit (Safari engine) ───────────────────────────────────────────────
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
