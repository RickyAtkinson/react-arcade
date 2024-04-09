import { Grid, Position } from "@/.";

export interface TetrisCell {
  isOccupied: boolean;
  occupiedBy: TetrominoName | null;
}

export type TetrisGrid = Grid<TetrisCell>;

export type TetrominoName = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export type TetrisShape = Grid<0 | 1>;

export interface TetrisTetromino {
  name: TetrominoName;
  shape: TetrisShape;
}

export interface TetrisPlayer {
  tetromino: TetrisTetromino;
  position: Position;
  nextTetrominoes: TetrisTetromino[];
}
