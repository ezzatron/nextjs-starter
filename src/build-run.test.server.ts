import { exec } from "node:child_process";
import type { DisposableTempDir } from "node:fs";
import { mkdtempDisposable } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { expect, it } from "vitest";

const execAsync = promisify(exec);

it("builds an app runner that validates environment variables", async () => {
  await using tempDir = await mkdtempDisposable(join(tmpdir(), "test-"));
  const run = await build(tempDir);

  await expect(run({ WEB_LISTEN_PORT: "not-a-number" })).rejects.toThrow(
    "must be an unsigned integer",
  );
});

async function build(tempDir: DisposableTempDir): Promise<Run> {
  const outPath = `${tempDir.path}/run.mjs`;

  const argv = process.argv;
  process.argv = ["node", "src/build-run.ts", outPath];
  await import("./build-run.ts");
  process.argv = argv;

  return async (env) => {
    const { stdout, stderr } = await execAsync(["node", outPath].join(" "), {
      env: { ...process.env, ...env },
    });

    if (stderr) throw new Error(stderr);

    return stdout;
  };
}

type Run = (env: Record<string, string>) => Promise<string>;
