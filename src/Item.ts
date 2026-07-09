export default class Item {
  constructor(
    readonly title: string,
    readonly pickupText: string,
    readonly weight: number = 1,
  ) {}
}
