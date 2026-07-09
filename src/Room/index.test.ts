import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Direction } from "../Direction.js";
import Item from "../Item.js";
import TextBuffer from "../TextBuffer.js";
import Room from "./index.js";

vi.mock("../TextBuffer.js", () => ({
  default: {
    add: vi.fn(),
    show: vi.fn(),
  },
}));

function createRoom(exits: Direction[] = [], items: Item[] = []): Room {
  return new Room(
    "Test Room",
    "A test room description",
    new Set(exits),
    items,
  );
}

describe("Room", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("describe", () => {
    it("adds the description, item list, and exit list to the text buffer", () => {
      const sword = new Item("Sword", "A sharp sword");
      const room = createRoom(["north", "east"], [sword]);

      room.describe();

      expect(TextBuffer.add).toHaveBeenNthCalledWith(
        1,
        "A test room description",
      );
      expect(TextBuffer.add).toHaveBeenNthCalledWith(
        2,
        "\nItems in Room:\n--------------\n[Sword - Wt: 1]",
      );
      expect(TextBuffer.add).toHaveBeenNthCalledWith(
        3,
        "\nPossible Directions:\n--------------------\n[north]\n[east]",
      );
      expect(TextBuffer.add).toHaveBeenCalledTimes(3);
    });

    it("shows <none> for items and exits when the room is empty", () => {
      const room = createRoom([], []);

      room.describe();

      expect(TextBuffer.add).toHaveBeenNthCalledWith(
        2,
        "\nItems in Room:\n--------------\n<none>",
      );
      expect(TextBuffer.add).toHaveBeenNthCalledWith(
        3,
        "\nPossible Directions:\n--------------------\n<none>",
      );
    });
  });

  describe("showTitle", () => {
    it("adds the room title to the text buffer", () => {
      const room = createRoom();

      room.showTitle();

      expect(TextBuffer.add).toHaveBeenCalledExactlyOnceWith("Test Room");
    });
  });

  describe("getItem", () => {
    it("returns the item matching the given name", () => {
      const sword = new Item("Sword", "A sharp sword");
      const room = createRoom([], [sword]);

      expect(room.getItem("Sword")).toBe(sword);
    });

    it("matches item names case-insensitively", () => {
      const sword = new Item("Sword", "A sharp sword");
      const room = createRoom([], [sword]);

      expect(room.getItem("sWORD")).toBe(sword);
    });

    it("returns null when no item matches", () => {
      const room = createRoom([], [new Item("Sword", "A sharp sword")]);

      expect(room.getItem("Shield")).toBeNull();
    });

    it("returns null when the room has no items", () => {
      const room = createRoom([], []);

      expect(room.getItem("Sword")).toBeNull();
    });
  });

  describe("addExit", () => {
    it("adds a new exit direction", () => {
      const room = createRoom([]);

      room.addExit("north");

      expect(room.canExit("north")).toBe(true);
    });

    it("is a no-op when the exit already exists", () => {
      const room = createRoom(["north"]);

      room.addExit("north");

      expect(room.canExit("north")).toBe(true);
    });
  });

  describe("removeExit", () => {
    it("removes an existing exit direction", () => {
      const room = createRoom(["north"]);

      room.removeExit("north");

      expect(room.canExit("north")).toBe(false);
    });

    it("is a no-op when the exit does not exist", () => {
      const room = createRoom([]);

      room.removeExit("north");

      expect(room.canExit("north")).toBe(false);
    });
  });

  describe("canExit", () => {
    it("returns true when the direction is a valid exit", () => {
      const room = createRoom(["east"]);

      expect(room.canExit("east")).toBe(true);
    });

    it("returns false when the direction is not a valid exit", () => {
      const room = createRoom(["east"]);

      expect(room.canExit("west")).toBe(false);
    });
  });
});
