import type { Direction } from "../Direction.js";
import type Item from "../Item.js";
import { getRoomCoordinates } from "../Level.js";
import TextBuffer from "../TextBuffer.js";
import type { Nullable } from "../types/index.js";
import { formatDirections, formatItemList } from "./internal.js";

export default class Room {
  constructor(
    readonly title: string,
    readonly description: string,
    private exits: Set<Direction>,
    private items: Item[],
  ) {}

  public describe(): void {
    TextBuffer.add(this.description);
    TextBuffer.add(this.getItemList());
    TextBuffer.add(this.getExitList());
  }

  public showTitle(): void {
    TextBuffer.add(this.title);
  }

  // getItem() - see if a room has an item
  public getItem(itemName: string): Nullable<Item> {
    const foundItem = this.items.find(
      (item) => item.title.toLowerCase() === itemName.toLowerCase(),
    );

    return foundItem || null;
  }

  public addExit(direction: Direction): void {
    this.exits.add(direction);
  }

  public removeExit(direction: Direction): void {
    this.exits.delete(direction);
  }

  public canExit(direction: Direction): boolean {
    return this.exits.has(direction);
  }

  // Private Methods
  private getItemList(): string {
    return formatItemList(this.items);
  }

  private getExitList(): string {
    return formatDirections(Array.from(this.exits));
  }

  private getCoordinates(): string {
    return getRoomCoordinates(this);
  }
}
