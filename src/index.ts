import { createInterface } from "node:readline/promises";
import GameManager from "./GameManager.js";
import CommandProcessor from "./CommandProcessor.js";
import chalk from "chalk";

export let quit: { value: boolean } = { value: false };

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.clear();
GameManager.showTitleScreen();

while (!quit.value) {
  const userInput = await rl.question(chalk.bold("What shall I do?\n> "));
  CommandProcessor.processCommand(userInput);
}

rl.close();