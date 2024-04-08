import { forwardRef } from "react";
import { TetrisGrid } from "@/tetris";
import TetrisGameBoard from "./TetrisGameBoard";

const TetrisGameController = forwardRef(
  (
    {
      gameGrid,
    }: {
      gameGrid: TetrisGrid;
    },
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    function handleOnKeyDown({ code }: { code: string }) {
      console.log("Key: ", code);
    }

    return (
      <button ref={ref} onKeyDown={handleOnKeyDown}>
        <TetrisGameBoard gameGrid={gameGrid} />
      </button>
    );
  },
);
TetrisGameController.displayName = "TetrisGameController";

export default TetrisGameController;
