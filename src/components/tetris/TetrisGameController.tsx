import { forwardRef } from "react";
import { SetStateFunction } from "@/index";
import { TetrisGrid, TetrisPlayer } from "@/tetris";
import TetrisGameGrid from "./TetrisGameGrid";

const TetrisGameController = forwardRef(
  (
    {
      gameGrid,
      setGameGrid,
      player,
      setPlayer,
      nextPlayer,
    }: {
      gameGrid: TetrisGrid;
      setGameGrid: SetStateFunction<TetrisGrid>;
      player: TetrisPlayer;
      setPlayer: SetStateFunction<TetrisPlayer>;
      nextPlayer: () => void;
    },
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    function handleOnKeyDown({ code }: { code: string }) {
      console.log("Key: ", code);
      console.log("Grid: ", gameGrid);
      console.log("Player: ", player);
    }

    return (
      <button ref={ref} onKeyDown={handleOnKeyDown}>
        <TetrisGameGrid gameGrid={gameGrid} />
      </button>
    );
  },
);
TetrisGameController.displayName = "TetrisGameController";

export default TetrisGameController;
