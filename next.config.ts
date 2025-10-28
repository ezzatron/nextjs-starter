import type { NextConfig } from "next";

const config: NextConfig = {
  distDir: "out/next/dist",
  output: process.env.NEXT_STANDALONE ? "standalone" : undefined,
};

export default config;
