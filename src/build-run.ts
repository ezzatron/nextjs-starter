import { build } from "esbuild";
import { relative } from "node:path";

const [, scriptPath, outfile] = process.argv;

/* istanbul ignore if -- @preserve */
if (!outfile) {
  console.error(`usage: node ${relative(process.cwd(), scriptPath)} <outfile>`);
  process.exit(1);
}

await build({
  entryPoints: ["src/run.ts"],
  bundle: true,
  define: {
    "process.env.AUSTENITE_MODE": JSON.stringify(""),
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  packages: "bundle",
  sourcemap: true,
  platform: "node",
  target: "node24",
  format: "esm",
  alias: {
    "nextjs-server": "./server.js",
  },
  external: ["./server.js"],
  outfile,
});
