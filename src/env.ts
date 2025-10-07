import { networkPortNumber } from "austenite";

export const port = networkPortNumber("PORT", "Port to listen on", {
  default: 8000,
});
