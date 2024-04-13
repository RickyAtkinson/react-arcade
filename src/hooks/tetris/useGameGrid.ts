import { useCallback, useState } from "react";
import { SetStateFunction } from "@/index";
import { TetrisGrid } from "@/tetris";
import { COLUMNS, ROWS, DEFAULT_CELL } from "@/data/tetris";
import { createEmptyGrid } from "@/utils/grid";

export default function useGameBoard(): [
  TetrisGrid,
  SetStateFunction<TetrisGrid>,
  () => void,
] {
  const [gameGrid, setGameGrid] = useState<TetrisGrid>(
    createEmptyGrid(ROWS, COLUMNS, DEFAULT_CELL),
  );

  const resetGameGrid = useCallback(() => {
    setGameGrid(createEmptyGrid(ROWS, COLUMNS, DEFAULT_CELL));
  }, []);

  return [gameGrid, setGameGrid, resetGameGrid];
}
