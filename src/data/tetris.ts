import { Position } from "..";

export const COLUMNS = 10; // The number of columns in the game board.
export const ROWS = 20; // The number of rows in the game board.
export const RESOLUTION = 22; // Size in pixels of the game board grid cells.
export const NEXT_TETROMINOES_SHOWN = 3; // How many upcoming tetrominoes to show the player (Can't be negative)

export const DEFAULT_FRAME_INTERVAL = 1000; // Initial time between game frames in ms
export const MINIMUM_FRAME_INTERVAL = 100; // Minimum time between game frames in ms
export const FRAME_INTERVAL_DECREMENT = 50; // Change in frame time when level increases
export const LINES_PER_LEVEL = 10; // Amount of lines that need to be cleared to increase the level

export const INITIAL_PLAYER_POSITION: Position = { x: 4, y: 0 };
