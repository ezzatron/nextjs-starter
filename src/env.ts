/* istanbul ignore file -- @preserve */
import { kubernetesAddress, networkPortNumber, string } from "austenite";

export const otelServiceName = string(
  "OTEL_SERVICE_NAME",
  "OpenTelemetry service name",
  { default: "nextjs-starter" },
);

export const petStoreAddress = kubernetesAddress("pet-store");

export const webListenPort = networkPortNumber(
  "WEB_LISTEN_PORT",
  "Port to listen on for web traffic",
  { default: 8000 },
);
