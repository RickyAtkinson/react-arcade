import { useEffect } from "react";
import { Position, SetStateFunction } from "@/index";
import { SnakeGrid } from "@/snake";
import { COLUMNS, DEFAULT_CELL, RESOLUTION, ROWS } from "@/data/snake";
import { createEmptyGrid } from "@/utils/grid";
import SnakeGridCell from "./SnakeGridCell";

export default function SnakeGameGrid({
  gameGrid,
  setGameGrid,
  snake,
  apple,
  isPlaying,
  isGameOver,
  isGamePaused,
}: {
  gameGrid: SnakeGrid;
  setGameGrid: SetStateFunction<SnakeGrid>;
  snake: Position[];
  apple: Position;
  isPlaying: boolean;
  isGameOver: boolean;
  isGamePaused: boolean;
}) {
  const boardStyles = {
    "--grid-rows": ROWS,
    "--grid-columns": COLUMNS,
    "--grid-resolution": `${RESOLUTION}px`,
  } as React.CSSProperties;

  useEffect(() => {
    if (!isPlaying) return;

    const newGrid = createEmptyGrid(ROWS, COLUMNS, DEFAULT_CELL);

    // Add the player snake to the grid
    snake.map((segment) => {
      newGrid[segment.y][segment.x].isOccupiedBy = "Snake";
    });

    // Add the apple to the grid
    newGrid[apple.y][apple.x].isOccupiedBy = "Apple";

    setGameGrid(newGrid);
  }, [isPlaying, snake, apple, setGameGrid]);

  return (
    <div
      className="grid grid-cols-[repeat(var(--grid-columns),_var(--grid-resolution))] grid-rows-[repeat(var(--grid-rows),_var(--grid-resolution))] rounded bg-green-300 p-1"
      style={boardStyles}
    >
      {gameGrid.map((row, y) =>
        row.map((cell, x) => (
          <SnakeGridCell
            key={`cell-${x}-${y}`}
            cell={cell}
            isGameOver={isGameOver}
            isGamePaused={isGamePaused}
          />
        )),
      )}
    </div>
  );
}
