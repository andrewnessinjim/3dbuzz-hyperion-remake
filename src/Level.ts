import Item from "./Item.js";
import Player, { position } from "./Player.js";
import Room from "./Room/index.js";

let roomGrid!: Room[][];

function buildLevel(): void {
  const redRoom = new Room("Red Room", "You just entered the red room.");

  const blueBall = new Item("Blue", "You just picked up a blue ball.");
  redRoom.addItem(blueBall);
  redRoom.addExit("east");

  const blueRoom = new Room("Blue Room", "You have entered the blue room");
  const redBall = new Item("Red", "You just picked up a red ball.");
  blueRoom.addItem(redBall);

  blueRoom.addExit("west");

  roomGrid = [[redRoom, blueRoom]];

  position.x = 0;
  position.y = 0;
}
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

export function getRoom(posX: number, posY: number): Room {
  if (posY < 0 || posY >= roomGrid.length) {
    throw new Error(
      `${posY} is invalid for posY. Max posY = ${roomGrid.length - 1}`,
    );
  }
  const roomRow = roomGrid[posY];
  if (!roomRow || posX < 0 || posX >= roomRow.length) {
    throw new Error(
      `${posX} is invalid for posX. Max posX = ${(roomRow?.length ?? 0) - 1}`,
    );
  }
  const room = roomRow[posX];
  if (!room) {
    throw new Error(`No room found at [${posX},${posY}]`);
  }
  return room;
}

// initialize - create the rooms, items, place the items in room and place the player in one of the rooms
export function init(): void {
  buildLevel();
}

// buildLevel
