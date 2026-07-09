import path from "node:path";
import { describe, expect, it } from "vitest";
import { extractGraph } from "archunit";

describe("internal.ts encapsulation", () => {
  it("only files in the same folder can import files ending with internal.ts", async () => {
    const edges = await extractGraph();
    console.log(edges)

    const violations = edges.filter(
      (edge) =>
        !edge.external &&
        edge.target.endsWith("internal.ts") &&
        path.posix.dirname(edge.source) !== path.posix.dirname(edge.target),
    );

    expect(violations).toStrictEqual([]);
  });
});
