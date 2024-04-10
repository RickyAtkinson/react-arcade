import { memo } from "react";
import { TetrisTetromino } from "@/tetris";
import { createEmptyGrid, getNewGridWithCellShape } from "@/utils/tetris/grid";
import TetrisGridCell from "./TetrisGridCell";

const TetrisPreview = memo(function TetrisPreview({
  tetromino,
  isPlaying,
}: {
  tetromino: TetrisTetromino;
  isPlaying: boolean;
}) {
  const { shape, name } = tetromino;

  const grid = getNewGridWithCellShape(
    createEmptyGrid(4, 4),
    shape,
    { x: 0, y: 0 },
    name,
  );

  return (
    <div className="w-fit rounded bg-zinc-800 p-1">
      <div className="grid h-16 w-16 grid-cols-4 grid-rows-4 gap-0.5">
        {isPlaying &&
          grid.map((row, y) =>
            row.map((cell, x) => (
              <TetrisGridCell key={`board-cell-${x}-${y}]`} cell={cell} />
            )),
          )}
      </div>
    </div>
  );
});

export default TetrisPreview;
