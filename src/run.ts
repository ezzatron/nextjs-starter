/**
 * This file runs before Next.js to validate the environment and automatically
 * set the correct listen hostname and port.
 */

import { initialize } from "austenite/node";
import { webListenPort } from "./env.ts";

// Validates environment variables
await initialize();

// Bind to all network interfaces
process.env.HOSTNAME = "0.0.0.0";

// Override the port to use the one defined in env.ts
process.env.PORT = webListenPort.value().toString();

await import("nextjs-server");
