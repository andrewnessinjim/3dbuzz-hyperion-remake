import type { Direction } from "./Direction.js";
import type Item from "./Item.js";
import type Room from "./Room/index.js";

let posX;
let posY;
let inventory: Item[];
let moves = 0;
let weightCapacity = 6;

function inventoryWeight(): number {
  //Todo: Finish inventory weight calculation
  return 0;
}

function move(direction: Direction): void {}
function pickupItem(itemName: string): void {}
function dropItem(itemName: string): void {}
function showInventory(): void {}

// / to abstract the room coordinates
function getCurrentRoom(): Room | null {
  return null;
}
function getInventoryItem(itemName: string): Item | null {
  return null;
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
