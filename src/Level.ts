import type Room from "./Room/index.js";
import type { Nullable } from "./types/index.js";

let roomGrid: Nullable<Room[][]> = null;

function buildLevel(): void {}
export function getRoomGrid() {
  return roomGrid;
}

export function getRoomCoordinates(room: Room): string {
  if (roomGrid) {
    for (let y = 0; y < roomGrid.length; y++) {
      const roomRow = roomGrid[y];
      if (roomRow) {
        for (let x = 0; x < roomRow.length; x++) {
          if (room === roomRow[x]) {
            return `[${x},${y}]`;
          }
        }
      }
    }
  }
  return "This room is not within the rooms grid";
}

// initialize - create the rooms, items, place the items in room and place the player in one of the rooms
export function init(): void {}

// buildLevel
