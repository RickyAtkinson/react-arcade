import { forwardRef } from "react";
import { SnakeGrid } from "@/snake";
import SnakeGameGrid from "./SnakeGameGrid";

const SnakeGameController = forwardRef(function SnakeGameGridController(
  {
    gameGrid,
    isPlaying,
    isGameOver,
    isGamePaused,
  }: {
    gameGrid: SnakeGrid;
    isPlaying: boolean;
    isGameOver: boolean;
    isGamePaused: boolean;
  },
  ref: React.Ref<HTMLButtonElement>,
) {
  function handleOnKeyDown({ code }: { code: string }) {
    console.log(code);
  }

  return (
    <button ref={ref} onKeyDown={handleOnKeyDown} className="relative">
      <SnakeGameGrid
        gameGrid={gameGrid}
        isGameOver={isGameOver}
        isGamePaused={isGamePaused}
      />
      {!isPlaying && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-green-950">
          Press the Play button to begin
        </span>
      )}
      {isPlaying && isGameOver && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-extrabold text-green-950">
          Game Over
        </span>
      )}
      {isPlaying && !isGameOver && isGamePaused && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-extrabold text-green-950">
          Paused
        </span>
      )}
    </button>
  );
});

export default SnakeGameController;
