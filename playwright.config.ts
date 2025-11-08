import { defineConfig, devices } from "@playwright/test";

const isCI = process.env.CI === "true";
const isDefaultProjects =
  process.argv.includes("test") &&
  !process.argv.some((a) => /^--project\b/.test(a));
const isUI = process.argv.includes("--ui");

export default defineConfig({
  testDir: "test/playwright",
  outputDir: "out/playwright/output",
  fullyParallel: true,
  retries: 1,
  reporter: [
    [isCI ? "github" : "list"],
    [
      "html",
      {
        open: "never",
        outputFolder: "out/playwright/report/html",
      },
    ],
  ],
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Pixel 5"] },
      expect: {
        toHaveScreenshot: {
          pathTemplate:
            "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}-chromium{ext}",
        },
      },
    },
    ...(isDefaultProjects && !isUI
      ? []
      : ([
          {
            name: "firefox",
            use: {
              ...devices["Pixel 5"],
              defaultBrowserType: "firefox",
              isMobile: false,
            },
            expect: {
              toHaveScreenshot: {
                pathTemplate:
                  "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}-firefox{ext}",
              },
            },
          },
          {
            name: "webkit",
            use: { ...devices["iPhone SE"] },
            expect: {
              toHaveScreenshot: {
                pathTemplate:
                  "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}-webkit{ext}",
              },
            },
          },
        ] as const)),
  ],
});
