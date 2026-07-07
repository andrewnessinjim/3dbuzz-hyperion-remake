import type Item from "./Item.js";

export default class Room {
  constructor(
    readonly title: string,
    readonly description: string,
    private exits: string[],
    private items:Item[]
  ) {}
  // Public methods

  // describe()
  // showTitle()
  // getItem() - see if a room has an item
  // addExit()
  // removeExit()
  // canExit()

  // Private Methods
  // getItemList()
  // getExitList()

  // getCoordinates()
}
