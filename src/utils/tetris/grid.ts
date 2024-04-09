import { Position } from "@/index";
import { TetrisCell, TetrisGrid, TetrisShape, TetrominoName } from "@/tetris";

const defaultTetrisCell: TetrisCell = {
  isOccupied: false,
  occupiedBy: null,
};

export function createEmptyGrid(rows: number, cols: number): TetrisGrid {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ ...defaultTetrisCell })),
  );
}

export function getNewGridWithCellShape(
  grid: TetrisGrid,
  shape: TetrisShape,
  isPlayer: boolean,
  position: Position,
  cellName: TetrominoName,
): TetrisGrid {
  const newGrid = JSON.parse(JSON.stringify(grid));

  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const gridX = x + position.x;
        const gridY = y + position.y;
        newGrid[gridY][gridX] = {
          isOccupied: !isPlayer,
          occupiedBy: cellName,
        };
      }
    });
  });

  return newGrid;
}
