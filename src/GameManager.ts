import { emitKeypressEvents } from "node:readline";
import { wordWrap } from "./utils/text/index.js";
import Player from "./Player.js";
import TextBuffer from "./TextBuffer.js";
import { quit } from "./index.js";
import * as Level from "./Level.js";

function hideCursor(): void {
  process.stdout.write("\x1B[?25l");
}

function showCursor(): void {
  process.stdout.write("\x1B[?25h");
}

function waitForKeyPress(): Promise<void> {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    emitKeypressEvents(stdin);
    const wasRaw = stdin.isRaw ?? false;
    stdin.setRawMode?.(true);

    const onKeyPress = (
      _chunk: string,
      key: { ctrl: boolean; name: string } | undefined,
    ): void => {
      stdin.off("keypress", onKeyPress);
      stdin.setRawMode?.(wasRaw);
      // Ctrl+C doesn't raise SIGINT in raw mode, so handle it explicitly.
      if (key?.ctrl && key.name === "c") {
        process.exit();
      }
      resolve();
    };
    stdin.on("keypress", onKeyPress);
  });
}

async function showTitleScreen(): Promise<void> {
  console.clear();
  console.log();
  console.log(
    wordWrap(
      "*** The Hyperion Project *** An XNA Xtreme 101 Game by 3D buzz (Remake by Andrew Nessin).\n\n\n",
    ),
  );
  console.log(
    "\nNOTE: You may type 'help' at any time to see a list of commands.",
  );
  console.log("\nPress a key to begin.");

  hideCursor();
  await waitForKeyPress();
  showCursor();
  console.clear();
}

function startGame(): void {
  Player.getCurrentRoom()?.describe();
  TextBuffer.show();
}

async function endGame(message: string): Promise<void> {
  console.clear();
  console.log(wordWrap(message));
  console.log("\nPress any key to close this window");
  hideCursor();
  await waitForKeyPress();
  quit.value = true;
}

async function applyRules(): Promise<void> {
  const redRoom = Level.getRoom(0, 0);
  const blueRoom = Level.getRoom(1, 0);
  const greenRoom = Level.getRoom(1, 1);
  const yellowRoom = Level.getRoom(0, 1);

  if (Player.moves.value > 15) {
    await endGame("You are too slow and old! Game over!");
  }

  if (
    redRoom.has("red ball") &&
    blueRoom.has("blue ball") &&
    greenRoom.has("green ball") &&
    yellowRoom.has("yellow ball")
  ) {
    await endGame(
      "Congratulations! You know how to match colors and open doors! You won!",
    );
  }

  if (Player.has("key 1") && Player.has("key 2")) {
    redRoom.addExit("south");
    redRoom.description = "You just entered the red room.";
    yellowRoom.addExit("north");
  }
}

export default {
  showTitleScreen,
  startGame,
  endGame,
  applyRules,
};
