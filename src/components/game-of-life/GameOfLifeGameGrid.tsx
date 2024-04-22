import { GameOfLifeGrid } from "@/game-of-life";
import { Position } from "@/index";
import { COLUMNS, RESOLUTION, ROWS } from "@/data/game-of-life";
import GameOfLifeGridCell from "./GameOfLifeGridCell";

export default function GameOfLifeGameGrid({
  gameGrid,
  handleCellClick,
}: {
  gameGrid: GameOfLifeGrid;
  handleCellClick: (position: Position) => void;
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
          <GameOfLifeGridCell
            key={`cell-${x}-${y}`}
            cell={cell}
            position={{ x: x, y: y }}
            handleCellClick={handleCellClick}
          />
        )),
      )}
    </div>
  );
}
