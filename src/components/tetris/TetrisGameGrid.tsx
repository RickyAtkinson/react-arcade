import { useEffect, useRef } from "react";
import { TetrisGrid, TetrisPlayer } from "@/tetris";
import { SetStateFunction } from "@/index";
import { COLUMNS, RESOLUTION, ROWS } from "@/data/tetris";
import {
  getNewGridWithCellShape,
  getOccupiedGridCells,
} from "@/utils/tetris/grid";
import { getPlayerDropPosition } from "@/utils/tetris/playerController";
import TetrisGridCell from "./TetrisGridCell";

export default function TetrisGameGrid({
  gameGrid,
  setGameGrid,
  player,
  isGamePlaying,
  isGameOver,
  isGamePaused,
}: {
  gameGrid: TetrisGrid;
  setGameGrid: SetStateFunction<TetrisGrid>;
  player: TetrisPlayer;
  isGamePlaying: boolean;
  isGameOver: boolean;
  isGamePaused: boolean;
}) {
  // Create a ref to the current grid for the useEffect to avoid constantly triggering rerenders
  const gameGridRef = useRef<TetrisGrid>(gameGrid);
  gameGridRef.current = gameGrid;

  const boardStyles = {
    "--grid-rows": ROWS,
    "--grid-columns": COLUMNS,
    "--grid-resolution": `${RESOLUTION}px`,
  } as React.CSSProperties;

  useEffect(() => {
    if (!isGamePlaying) return;

    // Get a copy of the grid without the old player
    let newGrid = getOccupiedGridCells(gameGridRef.current);

    // Add the player's "ghost"
    newGrid = getNewGridWithCellShape(
      newGrid,
      player.tetromino.shape,
      getPlayerDropPosition(player, newGrid),
      "Ghost",
    );

    // Add the updated player to the new grid
    newGrid = getNewGridWithCellShape(
      newGrid,
      player.tetromino.shape,
      player.position,
      player.tetromino.name,
    );

    setGameGrid(newGrid);
  }, [isGamePlaying, player, setGameGrid]);

  return (
    <div
      className="grid grid-cols-[repeat(var(--grid-columns),_var(--grid-resolution))] grid-rows-[repeat(var(--grid-rows),_var(--grid-resolution))] gap-[2px] rounded bg-zinc-900 p-1"
      style={boardStyles}
    >
      {gameGrid.map((row, y) =>
        row.map((cell, x) => (
          <TetrisGridCell
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
