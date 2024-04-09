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
  const gameGridRef = useRef<TetrisGrid>(getOccupiedGridCells(gameGrid));
  gameGridRef.current = getOccupiedGridCells(gameGrid);

  function handleOnKeyDown({ code }: { code: string }) {
    if (!isPlaying) return;

    if (code === "ArrowDown") {
      setPlayerPosition({ x: player.position.x, y: player.position.y + 1 });
    } else {
      nextPlayer();
    }
  }

  useEffect(() => {
    if (!isPlaying) return;

    setGameGrid(
      getNewGridWithCellShape(
        gameGridRef.current,
        player.tetromino.shape,
        true,
        player.position,
        player.tetromino.name,
      ),
    );
  }, [isPlaying, player, setGameGrid]);

  return (
    <button ref={ref} onKeyDown={handleOnKeyDown}>
      <TetrisGameGrid gameGrid={gameGrid} />
    </button>
  );
});

export default TetrisGameController;
