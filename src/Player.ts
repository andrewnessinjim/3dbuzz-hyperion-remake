import type { Direction } from "./Direction.js";
import type Item from "./Item.js";
import type Room from "./Room.js";

let posX;
let posY;
let inventory: Item[];
let moves = 0;
let weightCapacity = 6;

export function inventoryWeight(): number {
  //Todo: Finish inventory weight calculation
  return 0;
}

export function move(direction: Direction): void {}
export function pickupItem(itemName: string): void {}
export function dropItem(itemName: string): void {}
export function showInventory(): void {}

// / to abstract the room coordinates
export function getCurrentRoom(): Room | null {
  return null;
}
export function getInventoryItem(itemName: string): Item | null {
  return null;
}
