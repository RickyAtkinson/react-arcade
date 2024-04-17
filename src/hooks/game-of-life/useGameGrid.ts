import { useCallback, useState } from "react";
import { SetStateFunction } from "@/index";
import { GameOfLifeGrid } from "@/game-of-life";
import { COLUMNS, RANDOM_GRID_ALIVE_WEIGHT, ROWS } from "@/data/gameOfLife";
import { createEmptyGrid, createRandomGrid } from "@/utils/grid";

export default function useGameGrid(): [
  GameOfLifeGrid,
  SetStateFunction<GameOfLifeGrid>,
  () => void,
  () => void,
] {
  const [gameGrid, setGameGrid] = useState<GameOfLifeGrid>(
    createEmptyGrid(ROWS, COLUMNS, { isAlive: false }),
  );

  const resetGameGrid = useCallback(() => {
    setGameGrid(createEmptyGrid(ROWS, COLUMNS, { isAlive: false }));
  }, []);

  const randomizeGameGrid = useCallback(() => {
    setGameGrid(
      createRandomGrid(ROWS, COLUMNS, () =>
        Math.random() < RANDOM_GRID_ALIVE_WEIGHT
          ? { isAlive: true }
          : { isAlive: false },
      ),
    );
  }, []);

  return [gameGrid, setGameGrid, resetGameGrid, randomizeGameGrid];
}
