import { forwardRef, useEffect, useRef } from "react";
import { Position, SetStateFunction } from "@/index";
import { TetrisGrid, TetrisPlayer } from "@/tetris";
import {
  getNewGridWithCellShape,
  getOccupiedGridCells,
} from "@/utils/tetris/grid";
import TetrisGameGrid from "./TetrisGameGrid";

const TetrisGameController = forwardRef(function TetrisGameController(
  {
    isPlaying,
    gameGrid,
    setGameGrid,
    player,
    setPlayerPosition,
    nextPlayer,
  }: {
    isPlaying: boolean;
    gameGrid: TetrisGrid;
    setGameGrid: SetStateFunction<TetrisGrid>;
    player: TetrisPlayer;
    setPlayerPosition: (position: Position) => void;
    nextPlayer: () => void;
  },
  ref: React.Ref<HTMLButtonElement>,
) {
  // Create a ref to the current grid for the useEffect to avoid constantly
  // triggering rerenders
  const gameGridRef = useRef<TetrisGrid>(gameGrid);
  gameGridRef.current = gameGrid;

  function handleOnKeyDown({ code }: { code: string }) {
    if (!isPlaying) return;

    if (code === "ArrowDown") {
      setPlayerPosition({ x: player.position.x, y: player.position.y + 1 });
    } else if (code === "ArrowLeft") {
      setPlayerPosition({ x: player.position.x - 1, y: player.position.y });
    } else if (code === "ArrowRight") {
      setPlayerPosition({ x: player.position.x + 1, y: player.position.y });
    } else {
      nextPlayer();
    }
  }

  useEffect(() => {
    if (!isPlaying) return;

    // Get a copy of the grid without the old player
    let newGrid = getOccupiedGridCells(gameGridRef.current);

    // Add the updated player to the new grid
    newGrid = getNewGridWithCellShape(
      newGrid,
      player.tetromino.shape,
      true,
      player.position,
      player.tetromino.name,
    );

    setGameGrid(newGrid);
  }, [isPlaying, player, setGameGrid]);

  return (
    <button ref={ref} onKeyDown={handleOnKeyDown}>
      <TetrisGameGrid gameGrid={gameGrid} />
    </button>
  );
});

export default TetrisGameController;
