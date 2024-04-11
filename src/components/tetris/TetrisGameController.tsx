import { forwardRef } from "react";
import { useInterval } from "usehooks-ts";
import { Position, SetStateFunction } from "@/index";
import { TetrisCell, TetrisGrid, TetrisPlayer, TetrisShape } from "@/tetris";
import {
  DEFAULT_CELL,
  INITIAL_PLAYER_POSITION,
  NEXT_TETROMINOES_SHOWN,
} from "@/data/tetris";
import { getActionForKeyCode } from "@/utils/tetris/input";
import { playerController } from "@/utils/tetris/playerController";
import { checkCollision, getNewGridWithCellShape } from "@/utils/tetris/grid";
import TetrisGameGrid from "./TetrisGameGrid";

const TetrisGameController = forwardRef(function TetrisGameController(
  {
    isPlaying,
    isGameOver,
    setIsGameOver,
    isGamePaused,
    setIsGamePaused,
    quitGame,
    addClearedLines,
    frameInterval,
    pauseFrameInterval,
    resumeFrameInterval,
    gameGrid,
    setGameGrid,
    player,
    setPlayerPosition,
    setPlayerShape,
    nextPlayer,
  }: {
    isPlaying: boolean;
    isGameOver: boolean;
    setIsGameOver: SetStateFunction<boolean>;
    isGamePaused: boolean;
    setIsGamePaused: SetStateFunction<boolean>;
    quitGame: () => void;
    addClearedLines: (clearedLines: number) => void;
    frameInterval: number | null;
    pauseFrameInterval: () => void;
    resumeFrameInterval: () => void;
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

    if (action === null) return;

    if (action === "Quit") {
      quitGame();
    } else if (!isGameOver && action === "Pause") {
      isGamePaused ? resumeFrameInterval() : pauseFrameInterval();
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

  useInterval(() => {
    if (!isPlaying || isGamePaused || isGameOver) return;

    const desiredPosition = { x: player.position.x, y: player.position.y + 1 };
    if (!checkCollision(gameGrid, desiredPosition, player.tetromino.shape)) {
      playerController(
        "MoveDown",
        player,
        gameGrid,
        setPlayerPosition,
        setPlayerShape,
      );
    } else {
      // Player collided when moving down so set them in place
      let newGameGrid = getNewGridWithCellShape(
        gameGrid,
        player.tetromino.shape,
        player.position,
        player.tetromino.name,
        false,
      );

      // Check for cleared lines
      const blankRow = newGameGrid[0].map(() => ({ ...DEFAULT_CELL }));
      let linesCleared = 0;
      newGameGrid = newGameGrid.reduce(
        (acc: TetrisCell[][], row: TetrisCell[]) => {
          if (row.every((column) => column.isOccupied)) {
            linesCleared++;
            acc.unshift([...blankRow]);
          } else {
            acc.push(row);
          }
          return acc;
        },
        [],
      );

      if (linesCleared > 0) {
        addClearedLines(linesCleared);
      }

      // Game Over if the next Player tetromino will collide
      const nextTetrominoShape =
        player.nextTetrominoes[NEXT_TETROMINOES_SHOWN - 1].shape;
      setIsGameOver(
        checkCollision(
          newGameGrid,
          INITIAL_PLAYER_POSITION,
          nextTetrominoShape,
        ),
      );

      // Update the gameGride now we have processed the newGameGrid
      setGameGrid(newGameGrid);

      // Get the next tetromino and update the player
      nextPlayer();
    }
  }, frameInterval);

  return (
    <button ref={ref} onKeyDown={handleOnKeyDown} className="relative">
      <TetrisGameGrid
        gameGrid={gameGrid}
        setGameGrid={setGameGrid}
        isPlaying={isPlaying}
        isGameOver={isGameOver}
        isGamePaused={isGamePaused}
        player={player}
      />
      {!isPlaying && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
          Press the Play button to begin
        </span>
      )}
      {isPlaying && isGameOver && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-extrabold">
          Game Over
        </span>
      )}
      {isPlaying && !isGameOver && isGamePaused && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-extrabold">
          Paused
        </span>
      )}
    </button>
  );
});

export default TetrisGameController;
