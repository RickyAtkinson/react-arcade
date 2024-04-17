import { GameOfLifeGrid } from "@/game-of-life";
import { COLUMNS, RESOLUTION, ROWS } from "@/data/gameOfLife";
import GameOfLifeGridCell from "./GameOfLifeGridCell";

export default function GameOfLifeGameGrid({
  gameGrid,
}: {
  gameGrid: GameOfLifeGrid;
}) {
  const boardStyles = {
    "--grid-rows": ROWS,
    "--grid-columns": COLUMNS,
    "--grid-resolution": `${RESOLUTION}px`,
  } as React.CSSProperties;

  return (
    <div
      style={boardStyles}
      className="mx-auto grid w-fit grid-cols-[repeat(var(--grid-columns),_var(--grid-resolution))] grid-rows-[repeat(var(--grid-rows),_var(--grid-resolution))] border-2 border-solid border-zinc-800"
    >
      {gameGrid.map((row, y) =>
        row.map((cell, x) => (
          <GameOfLifeGridCell key={`cell-${x}-${y}`} cell={cell} />
        )),
      )}
    </div>
  );
}
