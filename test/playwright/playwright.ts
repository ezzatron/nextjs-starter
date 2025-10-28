import { test as baseTest } from "@playwright/test";
import { resolve } from "node:path";
import {
  GenericContainer,
  Network,
  type StartedNetwork,
  type StartedTestContainer,
  Wait,
} from "testcontainers";
import { createGripmockClient, type GripmockClient } from "../api/gripmock";

export { expect } from "@playwright/test";

export const test = baseTest.extend<
  object,
  {
    appContainer: StartedTestContainer;
    network: StartedNetwork;
    petStoreContainer: StartedTestContainer;
    petStoreMockClient: GripmockClient;
  }
>({
  appContainer: [
    async ({ network }, use) => {
      const container = await GenericContainer.fromDockerfile(
        resolve(import.meta.dirname, "../.."),
      ).build();

      const started = await container
        .withNetwork(network)
        .withEnvironment({
          PET_STORE_SERVICE_HOST: "pet-store",
          PET_STORE_SERVICE_PORT: "4770",
        })
        .withExposedPorts(3000)
        .withWaitStrategy(Wait.forHealthCheck().withStartupTimeout(60_000))
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
    await use(`http://localhost:${appContainer.getMappedPort(3000)}`);
  },

  network: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const network = new Network();
      const started = await network.start();

      try {
        await use(started);
      } finally {
        await started.stop();
      }
    },
    { scope: "worker", auto: true, timeout: 60_000 },
  ],

  petStoreContainer: [
    async ({ network }, use) => {
      const protoDir = resolve(import.meta.dirname, "../../src/api/gen");
      const container = new GenericContainer("bavix/gripmock:3.4.2")
        .withNetwork(network)
        .withNetworkAliases("pet-store")
        .withBindMounts([{ source: protoDir, target: "/proto", mode: "ro" }])
        .withCommand(["/proto/pet-store/v1.pb"])
        .withExposedPorts(4770, 4771)
        .withWaitStrategy(Wait.forHealthCheck().withStartupTimeout(60_000));

      const started = await container.start();

      try {
        await use(started);
      } finally {
        await started.stop();
      }
    },
    { scope: "worker", auto: true, timeout: 60_000 },
  ],

  petStoreMockClient: [
    async ({ petStoreContainer }, use) => {
      const host = petStoreContainer.getHost();
      const port = petStoreContainer.getMappedPort(4771);
      const adminURL = `http://${host}:${port}`;

      await use(createGripmockClient(adminURL));
    },
    { scope: "worker" },
  ],
});
