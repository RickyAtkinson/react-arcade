import { Grid } from ".";

export interface GameOfLifeCell {
  isAlive: boolean;
}

export type GameOfLifeGrid = Grid<GameOfLifeCell>;
