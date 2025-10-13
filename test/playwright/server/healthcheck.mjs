import { createConnection } from "node:net";

const client = createConnection(7357, "localhost");

client.on("connect", () => {
  client.end();
  process.exit(0);
});

client.on("error", () => {
  process.exit(1);
});

setTimeout(() => {
  client.destroy();
  process.exit(1);
}, 1_000);
