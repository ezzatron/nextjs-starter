/* istanbul ignore file -- @preserve */
import { registerOTel } from "@vercel/otel";
import { otelServiceName } from "./env";

export async function register() {
  registerOTel({ serviceName: otelServiceName.value() });
}
