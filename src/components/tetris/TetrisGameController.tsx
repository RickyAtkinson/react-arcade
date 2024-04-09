import { forwardRef, useEffect, useRef } from "react";
import { SetStateFunction } from "@/index";
import { TetrisGrid, TetrisPlayer } from "@/tetris";
import {
  getNewGridWithCellShape,
  getStaticGridCells,
} from "@/utils/tetris/grid";
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
    const gameGridRef = useRef<TetrisGrid>(getStaticGridCells(gameGrid));
    gameGridRef.current = getStaticGridCells(gameGrid);

    function handleOnKeyDown({ code }: { code: string }) {
      if (!isPlaying) return;

      nextPlayer();
      console.log("Key: ", code);
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
