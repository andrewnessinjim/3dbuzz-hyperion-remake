import type { Direction } from "./Direction.js";
import type Item from "./Item.js";

export default class Room {
  constructor(
    readonly title: string,
    readonly description: string,
    private exits: string[],
    private items: Item[],
  ) {}

  public describe(): void {}

  public showTitle(): void {}

  // getItem() - see if a room has an item
  public getItem(itemName: string): Item | null {
    return null;
  }

  public addExit(direction: Direction): void {}
  public removeExit(direction: Direction): void {}
  public canExit(direction: Direction): boolean {
    return false;
  }

  // Private Methods
  private getItemList(): string {
    return "";
  }
  private getExitList(): string {
    return "";
  }

  private getCoordinates(): string {
    return "";
  }
}
