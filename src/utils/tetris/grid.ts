import { Position } from "@/index";
import { TetrisGrid, TetrisShape, TetrominoName } from "@/tetris";
import { DEFAULT_CELL } from "@/data/tetris";

export function getNewGridWithCellShape(
  gameGrid: TetrisGrid,
  shape: TetrisShape,
  position: Position,
  cellName: TetrominoName | "Ghost",
  isTemporary: boolean = true,
): TetrisGrid {
  const newGrid = JSON.parse(JSON.stringify(gameGrid));

  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const gridX = x + position.x;
        const gridY = y + position.y;
        newGrid[gridY][gridX] = {
          isOccupied: !isTemporary,
          occupiedBy: cellName,
        };
      }
    });
  });

  return newGrid;
}

export function getOccupiedGridCells(gameGrid: TetrisGrid) {
  return gameGrid.map((row) =>
    row.map((cell) => (cell.isOccupied ? cell : { ...DEFAULT_CELL })),
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
