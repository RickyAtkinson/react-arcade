import { Grid } from "@/index";

export type SnakeAction =
  | "MoveUp"
  | "MoveLeft"
  | "MoveDown"
  | "MoveRight"
  | "Quit"
  | "Pause";

export interface SnakeCell {
  isOccupiedBy: "Snake" | "Apple" | null;
}

export type SnakeGrid = Grid<SnakeCell>;

export type Direction =
  | { x: 0; y: 1 }
  | { x: 0; y: -1 }
  | { x: -1; y: 0 }
  | { x: 1; y: 0 };
