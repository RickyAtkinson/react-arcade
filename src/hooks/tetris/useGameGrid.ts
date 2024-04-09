import { useCallback, useState } from "react";
import { SetStateFunction } from "@/index";
import { TetrisGrid } from "@/tetris";
import { COLUMNS, ROWS } from "@/data/tetris";
import { createEmptyGrid } from "@/utils/tetris/grid";

export default function useGameBoard(): [
  TetrisGrid,
  SetStateFunction<TetrisGrid>,
  () => void,
] {
  const [gameGrid, setGameGrid] = useState<TetrisGrid>(
    createEmptyGrid(ROWS, COLUMNS),
  );

  const resetGameGrid = useCallback(() => {
    setGameGrid(createEmptyGrid(ROWS, COLUMNS));
  }, []);

  return [gameGrid, setGameGrid, resetGameGrid];
}
