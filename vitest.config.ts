import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { join } from "node:path";
import { defineConfig } from "vitest/config";

const isCI = process.env.CI === "true";
const timeout = isCI ? 30_000 : 3_000;
const isDefaultProjects = !process.argv.some((a) => a.match(/^--project\b/));

const browserOptions = {
  enabled: true,
  headless: true,
  provider: "playwright",
  screenshotDirectory: "out/vitest/browser/screenshots",
} as const;

const browserInstanceOptions = {
  connect: {
    wsEndpoint: "ws://localhost:7357",
    options: {
      exposeNetwork: "<loopback>",
    },
  },
  context: {
    timezoneId: "UTC",
  },
} as const;

export default defineConfig({
  publicDir: "out/vitest/browser/public",
  define: {
    "process.env": JSON.stringify({}),
  },
  test: {
    watch: false,
    hookTimeout: timeout,
    testTimeout: timeout,
    teardownTimeout: timeout,
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.ts?(x)"],
    },
    projects: [
      {
        plugins: [react()],
        test: {
          include: ["src/**/*.test.ts?(x)"],
          browser: {
            ...browserOptions,
            instances: [
              {
                ...browserInstanceOptions,
                name: "chromium",
                browser: "chromium",
              },
              ...(isDefaultProjects
                ? []
                : [
                    {
                      ...browserInstanceOptions,
                      name: "firefox",
                      browser: "firefox",
                    },
                    {
                      ...browserInstanceOptions,
                      name: "webkit",
                      browser: "webkit",
                    },
                  ]),
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
            instances: [
              {
                ...browserInstanceOptions,
                name: "storybook",
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
