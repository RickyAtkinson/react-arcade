import { useCallback, useState } from "react";
import { SetStateFunction } from "@/index";
import { SnakeGrid } from "@/snake";
import { COLUMNS, ROWS, DEFAULT_CELL } from "@/data/snake";
import { createEmptyGrid } from "@/utils/grid";

export default function useGameGrid(): [
  SnakeGrid,
  SetStateFunction<SnakeGrid>,
  () => void,
] {
  const [gameGrid, setGameGrid] = useState<SnakeGrid>(
    createEmptyGrid(ROWS, COLUMNS, DEFAULT_CELL),
  );

  const resetGameGrid = useCallback(() => {
    setGameGrid(createEmptyGrid(ROWS, COLUMNS, DEFAULT_CELL));
  }, []);

  return [gameGrid, setGameGrid, resetGameGrid];
}
