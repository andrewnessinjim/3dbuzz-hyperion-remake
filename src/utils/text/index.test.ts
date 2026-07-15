import { describe, expect, it } from "vitest";
import * as TextUtils from "./index.js";
import { afterEach } from "node:test";

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

  describe("Word wrap command", () => {
    const originalColumns = process.stdout.columns;

    afterEach(() => {
      process.stdout.columns = originalColumns;
    });

    it("wraps one word per line when width is too small", () => {
      process.stdout.columns = 5;
      const actualWrappedText = TextUtils.wordWrap("alpha beta gamma");
      const expectedWrappedText = "alpha\nbeta\ngamma";

      expect(actualWrappedText).toBe(expectedWrappedText);
    });

    it("moves a long word to a new line if it doesn't fit at the end", () => {
      const input =
        "This is a dummy sentence to test breaking this looooooooooooooooooooooog word.";

      process.stdout.columns = 53; //A position that falls in the middle of the long word
      const actualWrappedText = TextUtils.wordWrap(input);
      const expectedWrappedTest =
        "This is a dummy sentence to test breaking this\nlooooooooooooooooooooooog word.";

      expect(actualWrappedText).toBe(expectedWrappedTest);
    });

    it("moves long words to a new line if it doesn't fit at the end (multiple lines)", () => {
      const input =
        "This is a dummy sentence to test breaking this looooooooooooooooooooooog word. This is a dummy sentence to test breaking this looooooooooooooooooooooog word. This is a dummy sentence to test breaking this looooooooooooooooooooooog word.";

      process.stdout.columns = 53; //A position that falls in the middle of the long word
      const actualWrappedText = TextUtils.wordWrap(input);
      const expectedWrappedTest =
        "This is a dummy sentence to test breaking this\nlooooooooooooooooooooooog word. This is a dummy\nsentence to test breaking this\nlooooooooooooooooooooooog word. This is a dummy\nsentence to test breaking this\nlooooooooooooooooooooooog word.";

      expect(actualWrappedText).toBe(expectedWrappedTest);
    });

    it("preserves existing newline characters", () => {
      const input = `Items in Room:
--------------
[Yellow ball - Wt: 1]
[Key 1 - Wt: 1]
`;
      const actualWrappedText = TextUtils.wordWrap(input);
      const expectedWrappedTest = input;
      expect(actualWrappedText).toBe(expectedWrappedTest);
    });
  });
});
