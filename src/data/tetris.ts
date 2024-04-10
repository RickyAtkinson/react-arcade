import { Position } from "@/index";
import { TetrisCell } from "@/tetris";

export const COLUMNS = 10; // The number of columns in the game board.
export const ROWS = 20; // The number of rows in the game board.
export const RESOLUTION = 22; // Size in pixels of the game board grid cells.
export const NEXT_TETROMINOES_SHOWN = 3; // How many upcoming tetrominoes to show the player (Can't be negative)
export const DEFAULT_CELL: TetrisCell = {
  isOccupied: false,
  occupiedBy: null,
};

export const DEFAULT_FRAME_INTERVAL = 1000; // Initial time between game frames in ms
export const MINIMUM_FRAME_INTERVAL = 100; // Minimum time between game frames in ms
export const FRAME_INTERVAL_DECREMENT = 50; // Change in frame time when level increases
export const LINES_PER_LEVEL = 10; // Amount of lines that need to be cleared to increase the level
export const POINT_MULTIPLIER_1_LINE = 100; // Points awarded per level when 1 line is clesred
export const POINT_MULTIPLIER_2_LINE = 300; // Points awarded per level when 2 lines are clesred
export const POINT_MULTIPLIER_3_LINE = 500; // Points awarded per level when 3 lines are clesred
export const POINT_MULTIPLIER_4_LINE = 800; // Points awarded per level when 4 lines are clesred

export const INITIAL_PLAYER_POSITION: Position = { x: 4, y: 0 };
