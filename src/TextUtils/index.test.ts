import { describe, expect, it } from "vitest";
import * as TextUtils from "./index.js";

describe("TextUtils", () => {
  describe("Extracts command", () => {
    it("with one argument", () => {
      const actualCommand = TextUtils.extractCommand("move east");
      const expectedCommand = "move";
      expect(actualCommand).toBe(expectedCommand);
    });

    it("with zero arguments", () => {
      const actualCommand = TextUtils.extractCommand("whereami");
      const expectedCommand = "whereami";
      expect(actualCommand).toBe(expectedCommand);
    });
  });

  it("Extracts an argument", () => {
    const actualArgument = TextUtils.extractArguments("move north");
    const expectedArgument = "north";
    expect(actualArgument).toBe(expectedArgument);
  });
});
