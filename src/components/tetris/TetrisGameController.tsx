import { forwardRef } from "react";
import { Position, SetStateFunction } from "@/index";
import { TetrisGrid, TetrisPlayer, TetrisShape } from "@/tetris";
import TetrisGameGrid from "./TetrisGameGrid";
import { getActionForKeyCode } from "@/utils/tetris/input";
import { playerController } from "@/utils/tetris/playerController";

const TetrisGameController = forwardRef(function TetrisGameController(
  {
    isPlaying,
    resetGame,
    isGameOver,
    setIsGameOver,
    isGamePaused,
    setIsGamePaused,
    gameGrid,
    setGameGrid,
    player,
    setPlayerPosition,
    setPlayerShape,
    nextPlayer,
  }: {
    isPlaying: boolean;
    resetGame: () => void;
    isGameOver: boolean;
    setIsGameOver: SetStateFunction<boolean>;
    isGamePaused: boolean;
    setIsGamePaused: SetStateFunction<boolean>;
    gameGrid: TetrisGrid;
    setGameGrid: SetStateFunction<TetrisGrid>;
    player: TetrisPlayer;
    setPlayerPosition: (position: Position) => void;
    setPlayerShape: (shape: TetrisShape) => void;
    nextPlayer: () => void;
  },
  ref: React.Ref<HTMLButtonElement>,
) {
  function handleOnKeyDown({ code }: { code: string }) {
    if (!isPlaying) return;

    const action = getActionForKeyCode(code);

    if (action === null) {
      nextPlayer(); // TODO: Only here to shut the linter up - Remove
      setIsGameOver(false); // TODO: Only here to shut the linter up - Remove
      return;
    }

    if (action === "Quit") {
      resetGame();
    } else if (!isGameOver && action === "Pause") {
      setIsGamePaused(!isGamePaused);
    } else if (!isGameOver && !isGamePaused) {
      playerController(
        action,
        player,
        gameGrid,
        setPlayerPosition,
        setPlayerShape,
      );
    }
  }

  return (
    <button ref={ref} onKeyDown={handleOnKeyDown}>
      <TetrisGameGrid
        gameGrid={gameGrid}
        setGameGrid={setGameGrid}
        isPlaying={isPlaying}
        player={player}
      />
    </button>
  );
});

export default TetrisGameController;
