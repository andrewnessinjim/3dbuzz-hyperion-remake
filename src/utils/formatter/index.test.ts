import { describe, expect, it } from "vitest";
import Item from "../../Item.js";
import type { Direction } from "../../Direction.js";
import { formatItemList, formatDirections } from "./index.js";

describe("Formatter", () => {
  describe("formatItemList", () => {
    it("Formats valid items into a representable string format", () => {
      const items = [
        new Item("Sword", "A sharp sword"),
        new Item("Shield", "A sturdy shield"),
      ];

      const actual = formatItemList(items, "Items in Room");
      const expected = "\nItems in Room:\n--------------\n[Sword - Wt: 1]\n[Shield - Wt: 1]";

      expect(actual).toBe(expected);
    });

    it("Formats an empty item list", () => {
      const actual = formatItemList([], "Items in Room");
      const expected = "\nItems in Room:\n--------------\n<none>";

      expect(actual).toBe(expected);
    });
  });

  describe("formatDirections", () => {
    it("Formats valid directions into a representable string format", () => {
      const directions: Direction[] = ["north", "east"];

      const actual = formatDirections(directions);
      const expected =
        "\nPossible Directions:\n--------------------\n[north]\n[east]";

      expect(actual).toBe(expected);
    });

    it("Formats an empty direction list", () => {
      const actual = formatDirections([]);
      const expected = "\nPossible Directions:\n--------------------\n<none>";

      expect(actual).toBe(expected);
    });
  });
});
