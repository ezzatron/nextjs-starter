import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const HEADER_PATTERN =
  /(?<=^\/\/.*generated.*\n)\/\/ versions:\n\/\/.*\n\/\/.*\n(?=\/\/ source:)/;

const genPath = join(import.meta.dirname, "gen");
const apis = await readdir(genPath);

for (const api of apis) {
  const apiPath = join(genPath, api);
  const files = await readdir(apiPath);

  for (const file of files) {
    if (!file.endsWith(".ts")) continue;

    const filePath = join(apiPath, file);
    const content = await readFile(filePath, "utf-8");

    await writeFile(filePath, content.replace(HEADER_PATTERN, ""));
  }
}
