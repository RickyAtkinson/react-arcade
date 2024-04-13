import { Grid } from "@/index";

export function createEmptyGrid<T>(
  rows: number,
  cols: number,
  defaultCell: T,
): Grid<T> {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ ...defaultCell })),
  );
}
