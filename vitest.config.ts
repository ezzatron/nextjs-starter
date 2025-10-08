import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const isCI = process.env.CI === "true";
const timeout = isCI ? 30_000 : 3_000;
const isDefaultProjects = !process.argv.some((a) => a.match(/^--project\b/));

const browserOptions = {
  context: {
    timezoneId: "UTC",
  },
} as const;

export default defineConfig({
  plugins: [react()],
  publicDir: "out/vitest/browser/public",
  define: {
    "process.env": JSON.stringify({}),
  },
  test: {
    watch: false,
    hookTimeout: timeout,
    testTimeout: timeout,
    teardownTimeout: timeout,
    include: ["test/vitest/**/*.test.ts?(x)"],
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.ts?(x)"],
      exclude: ["src/pages/_app.tsx", "src/pages/api/**"],
    },
    browser: {
      enabled: true,
      headless: true,
      provider: "playwright",
      screenshotDirectory: "out/vitest/browser/screenshots",
      instances: [
        { ...browserOptions, browser: "chromium" },
        ...(isDefaultProjects
          ? []
          : [
              { ...browserOptions, browser: "firefox" },
              { ...browserOptions, browser: "webkit" },
            ]),
      ],
    },
  },
});
