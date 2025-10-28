import type { NextConfig } from "next";

// Detect if running "next start" and automatically disable standalone mode
const isNextStart = process?.argv?.includes("start");

const config: NextConfig = {
  distDir: "out/next/dist",
  output: isNextStart ? undefined : "standalone",
};

export default config;
