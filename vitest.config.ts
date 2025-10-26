import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { join } from "node:path";
import { defineConfig } from "vitest/config";

const isCI = process.env.CI === "true";
const timeout = isCI ? 30_000 : 3_000;
const isDefaultProjects = !process.argv.some((a) => /^--project\b/.test(a));

const browserOptions = {
  enabled: true,
  headless: true,
  screenshotDirectory: "out/vitest/browser/screenshots",

  provider: playwright({
    connectOptions: {
      wsEndpoint: "ws://localhost:7357",
      exposeNetwork: "<loopback>",
    },
    contextOptions: {
      timezoneId: "UTC",
    },
  }),
} as const;

export default defineConfig({
  publicDir: "out/vitest/browser/public",
  test: {
    watch: false,
    hookTimeout: timeout,
    testTimeout: timeout,
    teardownTimeout: timeout,
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.ts?(x)"],
      exclude: ["src/api/gen"],
    },
    projects: [
      {
        test: {
          name: "server",
          include: ["src/**/*.test.server.ts"],
        },
      },
      {
        plugins: [react()],
        test: {
          setupFiles: ["test/vitest/browser.setup.ts"],
          include: ["src/**/*.test.ts?(x)"],
          exclude: ["src/**/*.test.server.ts"],
          browser: {
            ...browserOptions,
            instances: [
              { name: "chromium", browser: "chromium" },
              ...(isDefaultProjects
                ? []
                : ([
                    { name: "firefox", browser: "firefox" },
                    { name: "webkit", browser: "webkit" },
                  ] as const)),
            ],
          },
        },
      },
      {
        plugins: [
          storybookTest({ configDir: join(import.meta.dirname, ".storybook") }),
        ],
        test: {
          setupFiles: [".storybook/vitest.setup.ts"],
          browser: {
            ...browserOptions,
            instances: [{ name: "storybook", browser: "chromium" }],
          },
        },
      },
    ],
  },
});
