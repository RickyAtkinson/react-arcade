import { forwardRef } from "react";
import { SnakeGrid } from "@/snake";
import SnakeGameGrid from "./SnakeGameGrid";
import { Position, SetStateFunction } from "@/index";

const SnakeGameController = forwardRef(function SnakeGameGridController(
  {
    isPlaying,
    isGameOver,
    isGamePaused,
    gameGrid,
    setGameGrid,
    snake,
    apple,
  }: {
    isPlaying: boolean;
    isGameOver: boolean;
    isGamePaused: boolean;
    gameGrid: SnakeGrid;
    setGameGrid: SetStateFunction<SnakeGrid>;
    snake: Position[];
    apple: Position;
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
        setGameGrid={setGameGrid}
        snake={snake}
        apple={apple}
        isPlaying={isPlaying}
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
