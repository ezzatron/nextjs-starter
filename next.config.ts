import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

export default createConfig({
  output: "standalone",
});

function createConfig(config: NextConfig): NextConfig {
  return process.env.ANALYZE === "true"
    ? bundleAnalyzer({ openAnalyzer: false })(config)
    : config;
}
