import { memo } from "react";
import { TetrisTetromino } from "@/tetris";
import { DEFAULT_CELL } from "@/data/tetris";
import { getNewGridWithCellShape } from "@/utils/tetris/grid";
import { createEmptyGrid } from "@/utils/grid";
import TetrisGridCell from "./TetrisGridCell";

const TetrisPreview = memo(function TetrisPreview({
  tetromino,
  isGamePlaying,
  isGameOver,
  isGamePaused,
}: {
  tetromino: TetrisTetromino;
  isGamePlaying: boolean;
  isGameOver: boolean;
  isGamePaused: boolean;
}) {
  const { shape, name } = tetromino;

  const grid = getNewGridWithCellShape(
    createEmptyGrid(4, 4, DEFAULT_CELL),
    shape,
    { x: 0, y: 0 },
    name,
  );

  return (
    <div className="w-fit rounded bg-zinc-800 p-1">
      <div className="grid h-16 w-16 grid-cols-4 grid-rows-4 gap-0.5">
        {isGamePlaying &&
          grid.map((row, y) =>
            row.map((cell, x) => (
              <TetrisGridCell
                key={`board-cell-${x}-${y}]`}
                cell={cell}
                isGameOver={isGameOver}
                isGamePaused={isGamePaused}
              />
            )),
          )}
      </div>
    </div>
  );
});

export default TetrisPreview;
