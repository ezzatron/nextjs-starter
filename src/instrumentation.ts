/* istanbul ignore file -- @preserve */
import { registerOTel } from "@vercel/otel";
import { initialize } from "austenite/node";
import { otelServiceName } from "./env";

export async function register() {
  registerOTel({ serviceName: otelServiceName.value() });
  await initialize();
}
