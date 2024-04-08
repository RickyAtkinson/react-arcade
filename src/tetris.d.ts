import { Grid } from "@/.";

export type TetrominoName = "I" | "J" | "L" | "O" | "S" | "T";

export interface TetrisCell {
  isOccupied: boolean;
  occupiedBy: TetrominoName | null;
}

export type TetrisGrid = Grid<TetrisCell>;
