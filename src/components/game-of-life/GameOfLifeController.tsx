import { useCallback, useRef } from "react";
import { useInterval } from "usehooks-ts";
import { Position, SetStateFunction } from "@/index";
import { GameOfLifeGrid } from "@/game-of-life";
import {
  ADJACENT_DIRECTIONS,
  COLUMNS,
  FRAME_INTERVAL,
  ROWS,
} from "@/data/game-of-life";
import GameOfLifeGameGrid from "./GameOfLifeGameGrid";

export default function GameOfLifeController({
  isGamePlaying,
  gameGrid,
  setGameGrid,
}: {
  isGamePlaying: boolean;
  gameGrid: GameOfLifeGrid;
  setGameGrid: SetStateFunction<GameOfLifeGrid>;
}) {
  const gameGridRef = useRef(gameGrid);
  gameGridRef.current = gameGrid;

  function handleCellClick(position: Position) {
    const gameGridCopy = [...gameGrid];
    gameGridCopy[position.y][position.x].isAlive =
      !gameGridCopy[position.y][position.x].isAlive;
    setGameGrid(gameGridCopy);
  }

  const gameLoop = useCallback(() => {
    if (!isGamePlaying) return;

    const gameGridCopy: GameOfLifeGrid = JSON.parse(
      JSON.stringify(gameGridRef.current),
    );

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        let neighbors = 0;

        ADJACENT_DIRECTIONS.forEach(({ x, y }) => {
          const newX = i + y;
          const newY = j + x;

          if (newX >= 0 && newX < ROWS && newY >= 0 && newY < COLUMNS) {
            if (gameGridRef.current[newX][newY].isAlive) neighbors++;
          }
        });

        if (
          gameGridRef.current[i][j].isAlive === true &&
          (neighbors < 2 || neighbors > 3)
        ) {
          gameGridCopy[i][j].isAlive = false;
        } else if (
          gameGridRef.current[i][j].isAlive === false &&
          neighbors === 3
        ) {
          gameGridCopy[i][j].isAlive = true;
        }
      }
    }

    setGameGrid(gameGridCopy);
  }, [isGamePlaying, setGameGrid]);

  useInterval(gameLoop, FRAME_INTERVAL);

  return (
    <GameOfLifeGameGrid gameGrid={gameGrid} handleCellClick={handleCellClick} />
  );
}
