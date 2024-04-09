import { forwardRef, useEffect, useRef } from "react";
import { SetStateFunction } from "@/index";
import { TetrisGrid, TetrisPlayer } from "@/tetris";
import { getNewGridWithCellShape } from "@/utils/tetris/grid";
import TetrisGameGrid from "./TetrisGameGrid";

const TetrisGameController = forwardRef(
  (
    {
      isPlaying,
      gameGrid,
      setGameGrid,
      player,
      setPlayer,
      nextPlayer,
    }: {
      isPlaying: boolean;
      gameGrid: TetrisGrid;
      setGameGrid: SetStateFunction<TetrisGrid>;
      player: TetrisPlayer;
      setPlayer: SetStateFunction<TetrisPlayer>;
      nextPlayer: () => void;
    },
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const gameGridRef = useRef<TetrisGrid>(gameGrid);
    gameGridRef.current = gameGrid;

    function handleOnKeyDown({ code }: { code: string }) {
      console.log("Key: ", code);
      console.log("Grid: ", gameGrid);
      console.log("Player: ", player);
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
  },
);
TetrisGameController.displayName = "TetrisGameController";

export default TetrisGameController;
