import { defineConfig, devices } from "@playwright/test";

const isCI = process.env.CI === "true";
const isDefaultProjects =
  process.argv.some((a) => a === "test") &&
  !process.argv.some((a) => a.match(/^--project\b/));

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
      use: { ...devices["Desktop Chrome"] },
    },
    ...(isDefaultProjects
      ? []
      : [
          {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
          },
          {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
          },
        ]),
  ],
});
