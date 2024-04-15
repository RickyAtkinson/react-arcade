import { forwardRef } from "react";
import { Position, SetStateFunction } from "@/index";
import { Direction, SnakeGrid } from "@/snake";
import { COLUMNS, POINTS_PER_APPLE, ROWS } from "@/data/snake";
import { checkCollision } from "@/utils/snake/grid";
import { useInterval } from "usehooks-ts";
import { getActionForKeyCode } from "@/utils/snake/input";
import { getRandomGridCell } from "@/utils/grid";
import SnakeGameGrid from "./SnakeGameGrid";

const SnakeGameController = forwardRef(function SnakeGameGridController(
  {
    isPlaying,
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

    if (action === "Quit") {
      quitGame();
    } else if (!isGameOver && action === "Pause") {
      isGamePaused ? resumeFrameInterval() : pauseFrameInterval();
      setIsGamePaused((prev) => !prev);
    } else if (!isGameOver && !isGamePaused && action === "MoveLeft") {
      setDirection({ x: -1, y: 0 });
    } else if (!isGameOver && !isGamePaused && action === "MoveRight") {
      setDirection({ x: 1, y: 0 });
    } else if (!isGameOver && !isGamePaused && action === "MoveUp") {
      setDirection({ x: 0, y: -1 });
    } else if (!isGameOver && !isGamePaused && action === "MoveDown") {
      setDirection({ x: 0, y: 1 });
    }
  }

  function checkAppleCollision(
    desiredPosition: Position,
    currentApple: Position,
  ) {
    if (
      desiredPosition.x === currentApple.x &&
      desiredPosition.y === currentApple.y
    ) {
      setGameScore((prev) => prev + POINTS_PER_APPLE);

      let newApplePos = getRandomGridCell(ROWS, COLUMNS);
      while (checkCollision(newApplePos, snake)) {
        newApplePos = getRandomGridCell(ROWS, COLUMNS);
      }

      setApple(newApplePos);
      return true;
    }
    return false;
  }

  function gameLoop() {
    if (!isPlaying || isGameOver) return;

    const snakeCopy = [...snake];
    const newSnakehead: Position = {
      x: snakeCopy[0].x + direction.x,
      y: snakeCopy[0].y + direction.y,
    };

    if (checkCollision(newSnakehead, snake)) {
      setIsGameOver(true);
    } else {
      snakeCopy.unshift(newSnakehead);
      if (!checkAppleCollision(newSnakehead, apple)) snakeCopy.pop();
      // TODO: else check if game is complete
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
      {isPlaying && !isGameOver && isGamePaused && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-extrabold text-green-950">
          Paused
        </span>
      )}
    </button>
  );
});

export default SnakeGameController;
