import type { Direction } from "../../Direction.js";
import type Item from "../../Item.js";

export function formatItemList(items: Item[], title: string): string {
  return formatList(
    items.map((item) => item.title + " - " + "Wt: " + item.weight),
    title,
  );
}

export function formatDirections(directions: Direction[]) {
  return formatList(directions, "Possible Directions");
}

function formatList(items: string[], title: string) {
  const message = `${title}:`;
  const underline = "".padStart(message.length, "-");

  let itemString = "";
  if (items.length > 0) {
    items.forEach((item) => (itemString += "\n[" + item + "]"));
  } else {
    itemString = "\n<none>";
  }

  return "\n" + message + "\n" + underline + itemString;
}
