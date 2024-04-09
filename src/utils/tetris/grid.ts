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

export function getOccupiedGridCells(grid: TetrisGrid) {
  return grid.map((row) =>
    row.map((cell) => (cell.isOccupied ? cell : { ...defaultTetrisCell })),
  );
}

export function checkCollision(
  gameGrid: TetrisGrid,
  position: Position,
  shape: TetrisShape,
) {
  for (let y = 0; y < shape.length; y++) {
    const gridY = y + position.y;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const gridX = x + position.x;
        const isWithinGrid = gameGrid?.[gridY] && gameGrid[gridY]?.[gridX];

        if (!isWithinGrid || gameGrid[gridY][gridX].isOccupied) return true;
      }
    }
  }

  return false;
}
