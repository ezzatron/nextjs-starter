/* istanbul ignore file -- @preserve */
import { kubernetesAddress, string } from "austenite";
import { initialize } from "austenite/node";

export const otelServiceName = string(
  "OTEL_SERVICE_NAME",
  "OpenTelemetry service name",
  { default: "nextjs-starter" },
);

export const petStoreAddress = kubernetesAddress("pet-store");

if (process.env.AUSTENITE_MODE === "usage/markdown") {
  await initialize();
}
