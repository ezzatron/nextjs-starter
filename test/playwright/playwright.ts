/* eslint-disable react-hooks/rules-of-hooks */
import { expect as baseExpect, test as baseTest } from "@playwright/test";
import { resolve } from "node:path";
import {
  GenericContainer,
  type StartedTestContainer,
  Wait,
} from "testcontainers";

export const expect = baseExpect;

export const test = baseTest.extend<
  object,
  {
    appContainer: StartedTestContainer;
  }
>({
  appContainer: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const container = await GenericContainer.fromDockerfile(
        resolve(import.meta.dirname, "../.."),
      ).build();

      const started = await container
        .withExposedPorts(8000)
        .withWaitStrategy(
          Wait.forHttp("/robots.txt", 8000).withStartupTimeout(60_000),
        )
        .start();

      try {
        await use(started);
      } finally {
        await started.stop();
      }
    },
    { scope: "worker", auto: true, timeout: 60_000 },
  ],

  baseURL: async ({ appContainer }, use) => {
    await use(`http://localhost:${appContainer.getMappedPort(8000)}`);
  },
});
