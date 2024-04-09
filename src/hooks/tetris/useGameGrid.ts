import { useCallback, useState } from "react";
import { SetStateFunction } from "@/index";
import { TetrisGrid } from "@/tetris";
import { COLUMNS, ROWS } from "@/data/tetris";
import { createEmptyGrid } from "@/utils/tetris/board";

export default function useGameBoard(): [
  TetrisGrid,
  SetStateFunction<TetrisGrid>,
  () => void,
] {
  const [gameGrid, setGameGrid] = useState<TetrisGrid>(
    createEmptyGrid(ROWS, COLUMNS),
  );

  const clearGameGrid = useCallback(() => {
    setGameGrid(createEmptyGrid(ROWS, COLUMNS));
  }, []);

  return [gameGrid, setGameGrid, clearGameGrid];
}
