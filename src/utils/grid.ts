import { Grid, Position } from "@/index";

export function createEmptyGrid<T>(
  rows: number,
  cols: number,
  defaultCell: T,
): Grid<T> {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ ...defaultCell })),
  );
}

export function createRandomGrid<T>(
  rows: number,
  cols: number,
  randomCellFunc: () => T,
): Grid<T> {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => randomCellFunc()),
  );
}

export function getRandomGridCell(numRows: number, numCols: number): Position {
  return {
    x: Math.floor(Math.random() * numCols),
    y: Math.floor(Math.random() * numRows),
  };
}
