import type Room from "./Room/index.js";

export default class Item {
  constructor(
    readonly title: string,
    readonly pickupText: string,
    readonly dropText: (room: Room) => string = () =>
      `The ${title} has been dropped into this room.`,
    readonly weight: number = 1,
  ) {}
}
