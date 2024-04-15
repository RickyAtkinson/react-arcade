import { Position } from "@/index";
import { Direction, SnakeCell } from "@/snake";

export const COLUMNS = 20; // The number of columns in the game board.
export const ROWS = 20; // The number of rows in the game board.
export const RESOLUTION = 20; // Size in pixels of the game board grid cells.
export const DEFAULT_CELL: SnakeCell = {
  isOccupiedBy: null,
};
export const INITIAL_SNAKE: Position[] = [
  { x: 8, y: 7 },
  { x: 8, y: 8 },
];
export const INITIAL_APPLE: Position = { x: 8, y: 3 };
export const INITIAL_DIRECTION: Direction = { x: 0, y: -1 };
export const POINTS_PER_APPLE = 10;
