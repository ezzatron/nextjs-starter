import { initialize } from "austenite/node";

export async function register() {
  // This ensures that austenite is included in the server bundle
  await initialize();
}
