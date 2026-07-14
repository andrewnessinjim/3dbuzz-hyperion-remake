import { createInterface } from "node:readline/promises";
import GameManager from "./GameManager.js";
import CommandProcessor from "./CommandProcessor.js";
import * as Level from "./Level.js"
import chalk from "chalk";

export let quit: { value: boolean } = { value: false };

console.clear();
await GameManager.showTitleScreen();
Level.init();
GameManager.startGame();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

while (!quit.value) {
  const userInput = await rl.question(chalk.bold("\n\nWhat shall I do?\n> "));
  await CommandProcessor.processCommand(userInput);
}

rl.close();