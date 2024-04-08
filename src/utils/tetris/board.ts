import { TetrisCell, TetrisGrid } from "@/tetris";

const defaultTetrisCell: TetrisCell = {
  isOccupied: false,
  occupiedBy: null,
};

export function createEmptyGrid(rows: number, cols: number): TetrisGrid {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ ...defaultTetrisCell })),
  );
}
