import { forwardRef } from "react";
import { Position, SetStateFunction } from "@/index";
import { Direction, SnakeGrid } from "@/snake";
import SnakeGameGrid from "./SnakeGameGrid";
import checkCollision from "@/utils/snake/grid";
import { useInterval } from "usehooks-ts";
import { getActionForKeyCode } from "@/utils/snake/input";

const SnakeGameController = forwardRef(function SnakeGameGridController(
  {
    isPlaying,
    isGameOver,
    setIsGameOver,
    isGamePaused,
    gameGrid,
    setGameGrid,
    snake,
    setSnake,
    apple,
    direction,
    setDirection,
  }: {
    isPlaying: boolean;
    isGameOver: boolean;
    isGamePaused: boolean;
    setIsGameOver: SetStateFunction<boolean>;
    gameGrid: SnakeGrid;
    setGameGrid: SetStateFunction<SnakeGrid>;
    snake: Position[];
    setSnake: SetStateFunction<Position[]>;
    apple: Position;
    direction: Direction;
    setDirection: SetStateFunction<Direction>;
  },
  ref: React.Ref<HTMLButtonElement>,
) {
  function handleOnKeyDown({ code }: { code: string }) {
    const action = getActionForKeyCode(code);

    if (action === "Quit") {
      console.log("Quit");
    } else if (action === "Pause") {
      console.log("Pause");
    } else if (action === "MoveLeft") {
      setDirection({ x: -1, y: 0 });
    } else if (action === "MoveRight") {
      setDirection({ x: 1, y: 0 });
    } else if (action === "MoveUp") {
      setDirection({ x: 0, y: -1 });
    } else if (action === "MoveDown") {
      setDirection({ x: 0, y: 1 });
    }
  }

  function gameLoop() {
    if (!isPlaying || isGameOver) return;

    const snakeCopy = [...snake];
    const newSnakehead: Position = {
      x: snakeCopy[0].x + direction.x,
      y: snakeCopy[0].y + direction.y,
    };
    snakeCopy.unshift(newSnakehead);

    // TODO: Check if game is complete

    // Check for collision
    if (checkCollision(newSnakehead, snake)) {
      snakeCopy.shift();
      setIsGameOver(true);
    } else {
      // TODO: Check apple collision
      snakeCopy.pop();
    }

    setSnake(snakeCopy);
  }

  useInterval(() => gameLoop(), 1000);

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
