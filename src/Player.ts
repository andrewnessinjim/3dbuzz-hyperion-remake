import type { Direction } from "./Direction.js";
import type Item from "./Item.js";
import { getRoom } from "./Level.js";
import type Room from "./Room/index.js";
import TextBuffer from "./TextBuffer.js";
import type { Nullable } from "./types/index.js";
import { formatItemList } from "./utils/formatter/index.js";


export const position = { x: 0, y: 0 };

let inventory: Item[] = [];
let moves = 0;
let weightCapacity = 6;

function inventoryWeight(): number {
  //Todo: Finish inventory weight calculation
  let totalWeight = 0;
  inventory.forEach((item) => (totalWeight += item.weight));
  return totalWeight;
}

function move(direction: Direction): void {
  const currentRoom = getCurrentRoom();

  if (!currentRoom?.canExit(direction)) {
    TextBuffer.add("Invalid direction.");
    return;
  }

  moves++;

  switch (direction) {
    case "north":
      position.y--;
      break;
    case "south":
      position.y++;
      break;
    case "east":
      position.x++;
      break;
    case "west":
      position.x--;
      break;
  }

  getCurrentRoom()?.describe();
}
function pickupItem(itemName: string): void {
  const currentRoom = getCurrentRoom();
  const item = currentRoom?.getItem(itemName);

  if (!item) {
    TextBuffer.add("There is no " + itemName + " in this room.");
    return;
  }

  if (inventoryWeight() + item.weight > weightCapacity) {
    TextBuffer.add(
      "you must first drop some weight before you can pick " + itemName + ".",
    );
    return;
  }

  currentRoom?.removeItem(item);
  inventory.push(item);
  TextBuffer.add(item.pickupText);
}

function dropItem(itemName: string): void {
  const currentRoom = getCurrentRoom();
  const itemDrop = getInventoryItem(itemName);
  if (!itemDrop) {
    TextBuffer.add("There is no " + itemName + " in your inventory.");
    return;
  }

  inventory = inventory.filter((item) => item !== itemDrop);
  currentRoom?.addItem(itemDrop);
  TextBuffer.add("The " + itemName + " has been dropped into this room.");
}
function showInventory(): void {
  const itemsText = formatItemList(inventory, "You inventory contains");
  const totalWeightText = `\n\nTotal Wt: ${inventoryWeight()} / ${weightCapacity}`;

  const inventoryText = itemsText + totalWeightText;
  TextBuffer.add(inventoryText);
}

// / to abstract the room coordinates
function getCurrentRoom(): Nullable<Room> {
  return getRoom(position.x, position.y);
}
function getInventoryItem(itemName: string): Item | null {
  const found = inventory.find(
    (item) => item.title.toLowerCase() === itemName.toLowerCase(),
  );
  return found || null;
}

export default {
  inventoryWeight,
  move,
  pickupItem,
  dropItem,
  showInventory,
  getCurrentRoom,
  getInventoryItem,
};
