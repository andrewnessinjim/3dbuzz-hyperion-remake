import { emitKeypressEvents } from "node:readline";
import { wordWrap } from "./utils/text/index.js";
import Player from "./Player.js";
import TextBuffer from "./TextBuffer.js";
import { quit } from "./index.js";

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
  quit.value = true;
  console.clear();
  console.log(wordWrap(message));
  console.log("\nPress any key to close this window");
  hideCursor();
  await waitForKeyPress();
}

function applyRules(): void {}

export default {
  showTitleScreen,
  startGame,
  endGame,
  applyRules,
};
