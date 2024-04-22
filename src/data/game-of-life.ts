import { Vec2 } from "..";

export const COLUMNS = 35;
export const ROWS = 25;
export const RESOLUTION = 20;

export const FRAME_INTERVAL = 100;

export const RANDOM_GRID_ALIVE_WEIGHT = 0.25;
export const ADJACENT_DIRECTIONS: Vec2<-1 | 0 | 1>[] = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 1 },
  { x: 1, y: 1 },
  { x: -1, y: -1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
];
