import { quit } from "./index.js";
import * as TextUtils from "./utils/text/index.js";
import Player from "./Player.js";
import { isValidDirection } from "./Direction.js";
import TextBuffer from "./TextBuffer.js";
import GameManager from "./GameManager.js";
import chalk from "chalk";

export async function processCommand(line: string): Promise<void> {
  const command = TextUtils.extractCommand(line.trim()).trim().toLowerCase();
  const argument = TextUtils.extractArguments(line.trim()).trim().toLowerCase();

  switch (command) {
    case "exit":
      quit.value = true;
      return;
    case "help":
      showHelp();
      break;
    case "move":
      if (isValidDirection(argument)) {
        Player.move(argument);
      }
      break;
    case "look":
      Player.getCurrentRoom()?.describe();
      break;
    case "pickup":
      Player.pickupItem(argument);
      break;
    case "drop":
      Player.dropItem(argument);
      break;
    case "inventory":
      Player.showInventory();
      break;
    case "whereami":
      Player.getCurrentRoom()?.showTitle();
      break;
    default:
      TextBuffer.add(chalk.red("Input not understood"));
      showHelp();
      break;
  }

  await GameManager.applyRules();
  TextBuffer.show();
}
export function showHelp(): void {
  TextBuffer.add("Available Commands:");
  TextBuffer.add("-------------------");
  TextBuffer.add("help");
  TextBuffer.add("exit");
  TextBuffer.add("move [north, south, east, west]");
  TextBuffer.add("look");
  TextBuffer.add("pickup [item name]");
  TextBuffer.add("drop [item name]");
  TextBuffer.add("inventory");
  TextBuffer.add("whereami");
}

export default {
  processCommand,
  showHelp,
};
