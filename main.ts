// make.fun — "The Dog Ate My Homework: Funniest Excuse"
// Bounty: u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c
//
// Writes one line, under 200 characters, of the excuse a dog gives
// after being caught eating the homework, to /output/entry.txt. The
// dog's defence is dog law: homework left on the floor, unguarded,
// smelling of pencil is not homework at all — it is a buffet. The
// joke is pure dog logic — the dog believes it did nothing wrong —
// and it stays fresh by avoiding the stock lines about the taste of
// paper or being a good boy, exactly what the judge brief rewards.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "In dog law, homework left on the floor, unguarded, smelling of pencil is not homework — it's a buffet.";

// The gate: 1-200 Unicode code points, and not only white space. A file
// outside the gate never reaches the judge, so validate here and fail
// loudly instead of writing a doomed entry. Array.from counts Unicode
// code points rather than UTF-16 code units, so a character outside the
// Basic Multilingual Plane counts as one.
const GATE_MIN = 1;
const GATE_MAX = 200;

function validateEntry(candidate: string): number {
  const length = Array.from(candidate).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(`entry is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`);
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry holds only white space");
  }
  return length;
}

validateEntry(TEXT);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
