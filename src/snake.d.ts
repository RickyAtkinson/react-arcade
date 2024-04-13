import { Grid } from "@/index";

export interface SnakeCell {
  isOccupiedBy: "Snake" | "Apple" | null;
}

export type SnakeGrid = Grid<SnakeCell>;
