import { TetrisGrid } from "@/tetris";
import TetrisGridCell from "./TetrisGridCell";
import { COLUMNS, RESOLUTION, ROWS } from "@/data/tetris";

export default function TetrisGameBoard({
  gameGrid,
}: {
  gameGrid: TetrisGrid;
}) {
  const boardStyles = {
    "--grid-rows": ROWS,
    "--grid-columns": COLUMNS,
    "--grid-resolution": `${RESOLUTION}px`,
  } as React.CSSProperties;

  return (
    <div
      className="grid grid-cols-[repeat(var(--grid-columns),_var(--grid-resolution))] grid-rows-[repeat(var(--grid-rows),_var(--grid-resolution))] gap-[2px] rounded bg-zinc-900 p-1"
      style={boardStyles}
    >
      {gameGrid.map((rows, y) =>
        rows.map((cell, x) => (
          <TetrisGridCell key={`cell-${x}-${y}`} cell={cell} />
        )),
      )}
    </div>
  );
}
