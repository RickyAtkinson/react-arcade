import { SnakeGrid } from "@/snake";
import { COLUMNS, RESOLUTION, ROWS } from "@/data/snake";
import SnakeGridCell from "./SnakeGridCell";

export default function SnakeGameGrid({
  gameGrid,
  isGameOver,
  isGamePaused,
}: {
  gameGrid: SnakeGrid;
  isGameOver: boolean;
  isGamePaused: boolean;
}) {
  const boardStyles = {
    "--grid-rows": ROWS,
    "--grid-columns": COLUMNS,
    "--grid-resolution": `${RESOLUTION}px`,
  } as React.CSSProperties;

  return (
    <div
      className="grid grid-cols-[repeat(var(--grid-columns),_var(--grid-resolution))] grid-rows-[repeat(var(--grid-rows),_var(--grid-resolution))] gap-[2px] rounded bg-green-300 p-1"
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
