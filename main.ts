import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The repository root is derived from this file's own location, so the
// entrypoint works no matter which directory the grader invokes it from.
const repoRoot = dirname(fileURLToPath(import.meta.url));
void repoRoot;

// One line, in the machine's voice: it ran the numbers, the numbers said
// no ten thousand times, and it asks anyway. The badness is the joke —
// a machine that treats 9,998 breakups as a rounding error.
const entry =
  "I ran 10,000 simulations of us dating. You left in 9,998 of them. Want to try again?";

// The gate only accepts 1 to 140 characters of UTF-8 text on a single
// line, so refuse loudly instead of ever writing an entry the scorer
// would reject. The entry below is 84 characters, well inside the gate,
// and the guard below keeps it that way if the line is ever reworded.
if (entry.length < 1 || entry.length > 140) {
  throw new Error(
    `entry is ${entry.length} characters, outside the 1-140 gate`,
  );
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
