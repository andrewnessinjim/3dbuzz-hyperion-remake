const DirectionTypes = {
  north: "north",
  south: "south",
  east: "east",
  west: "west",
} as const;

export type Direction = keyof typeof DirectionTypes;

export function isValidDirection(direction: string): direction is Direction {
  return Object.keys(DirectionTypes).includes(direction);
}
