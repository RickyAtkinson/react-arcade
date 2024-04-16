import { forwardRef } from "react";
import { Position, SetStateFunction } from "@/index";
import { Direction, SnakeGrid } from "@/snake";
import { MAX_SNAKE_LENGTH } from "@/data/snake";
import { checkCollision, checkAppleCollision } from "@/utils/snake/grid";
import { useInterval } from "usehooks-ts";
import { getActionForKeyCode } from "@/utils/snake/input";
import SnakeGameGrid from "./SnakeGameGrid";

const SnakeGameController = forwardRef(function SnakeGameGridController(
  {
    isPlaying,
    isGameComplete,
    setIsGameComplete,
    isGameOver,
    setIsGameOver,
    isGamePaused,
    setIsGamePaused,
    gameScore,
    setGameScore,
    frameInterval,
    pauseFrameInterval,
    resumeFrameInterval,
    gameGrid,
    setGameGrid,
    snake,
    setSnake,
    apple,
    setApple,
    direction,
    setDirection,
    quitGame,
  }: {
    isPlaying: boolean;
    isGameComplete: boolean;
    setIsGameComplete: SetStateFunction<boolean>;
    isGameOver: boolean;
    setIsGameOver: SetStateFunction<boolean>;
    isGamePaused: boolean;
    setIsGamePaused: SetStateFunction<boolean>;
    gameScore: number;
    setGameScore: SetStateFunction<number>;
    frameInterval: number | null;
    pauseFrameInterval: () => void;
    resumeFrameInterval: () => void;
    gameGrid: SnakeGrid;
    setGameGrid: SetStateFunction<SnakeGrid>;
    snake: Position[];
    setSnake: SetStateFunction<Position[]>;
    apple: Position;
    setApple: SetStateFunction<Position>;
    direction: Direction;
    setDirection: SetStateFunction<Direction>;
    quitGame: () => void;
  },
  ref: React.Ref<HTMLButtonElement>,
) {
  function handleOnKeyDown({ code }: { code: string }) {
    const action = getActionForKeyCode(code);

    // TODO: Don't allow player to change direction back into the snake body.
    if (action === "Quit") {
      quitGame();
    } else if (!isGameOver && !isGameComplete && action === "Pause") {
      isGamePaused ? resumeFrameInterval() : pauseFrameInterval();
      setIsGamePaused((prev) => !prev);
    } else if (
      !isGameOver &&
      !isGamePaused &&
      !isGameComplete &&
      action === "MoveLeft"
    ) {
      setDirection({ x: -1, y: 0 });
    } else if (
      !isGameOver &&
      !isGamePaused &&
      !isGameComplete &&
      action === "MoveRight"
    ) {
      setDirection({ x: 1, y: 0 });
    } else if (
      !isGameOver &&
      !isGamePaused &&
      !isGameComplete &&
      action === "MoveUp"
    ) {
      setDirection({ x: 0, y: -1 });
    } else if (
      !isGameOver &&
      !isGamePaused &&
      !isGameComplete &&
      action === "MoveDown"
    ) {
      setDirection({ x: 0, y: 1 });
    }
  }

  function gameLoop() {
    if (!isPlaying || isGameOver || isGameComplete) return;

    const snakeCopy = [...snake];
    const newSnakehead: Position = {
      x: snakeCopy[0].x + direction.x,
      y: snakeCopy[0].y + direction.y,
    };

    if (checkCollision(newSnakehead, snake)) {
      setIsGameOver(true);
    } else {
      snakeCopy.unshift(newSnakehead);
      if (
        !checkAppleCollision(snake, newSnakehead, apple, setApple, setGameScore)
      )
        snakeCopy.pop();
      else if (snakeCopy.length >= MAX_SNAKE_LENGTH) setIsGameComplete(true);
    }
    setSnake(snakeCopy);
  }

  useInterval(() => gameLoop(), frameInterval);

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
      {isPlaying && (
        <span className="absolute left-0 top-0 p-2 text-lg font-bold leading-none text-green-950">
          {gameScore}
        </span>
      )}
      {isPlaying && isGameOver && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-extrabold text-green-950">
          Game Over
        </span>
      )}
      {isPlaying && !isGameOver && isGameComplete && (
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
