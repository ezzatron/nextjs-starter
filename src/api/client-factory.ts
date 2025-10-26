import { createClientFactory } from "nice-grpc"; // or 'nice-grpc-web'
import { openTelemetryClientMiddleware } from "nice-grpc-opentelemetry";

export const clientFactory = createClientFactory().use(
  openTelemetryClientMiddleware(),
);
