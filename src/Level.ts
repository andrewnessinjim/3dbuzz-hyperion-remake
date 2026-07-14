import Item from "./Item.js";
import Player from "./Player.js";
import Room from "./Room/index.js";

let roomGrid!: Room[][];

function buildLevel(): void {
  const redRoom = new Room(
    "Red Room",
    "You just entered the red room. There is a locked exit to the south.",
  );
  const yellowBall = new Item("Yellow ball", "You just picked up a yellow ball.");
  const key1 = new Item("Key 1", "You just picked up a key.");
  redRoom.addItem(yellowBall);
  redRoom.addItem(key1);
  redRoom.addExit("east");

  const blueRoom = new Room("Blue Room", "You have entered the blue room");
  const redBall = new Item("Red ball", "You just picked up a red ball.");
  const key2 = new Item("Key 2", "You just picked up a key.");
  blueRoom.addItem(redBall);
  blueRoom.addItem(key2);
  blueRoom.addExit("south");
  blueRoom.addExit("west");

  const greenRoom = new Room("Green room", "You just entered the green room.");
  const blueBall = new Item("Blue ball", "You just picked up a blue ball.");
  greenRoom.addItem(blueBall);
  greenRoom.addExit("north");

  const yellowRoom = new Room(
    "Yellow room",
    "you just entered the yellow room.",
  );
  const greenBall = new Item("Green ball", "you just picked up a green ball.");
  yellowRoom.addItem(greenBall);

  roomGrid = [
    [redRoom, blueRoom],
    [yellowRoom, greenRoom],
  ];

  Player.position.x = 0;
  Player.position.y = 0;
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
