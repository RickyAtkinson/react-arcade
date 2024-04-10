import { forwardRef } from "react";
import { useInterval } from "usehooks-ts";
import { Position, SetStateFunction } from "@/index";
import { TetrisGrid, TetrisPlayer, TetrisShape } from "@/tetris";
import { INITIAL_PLAYER_POSITION, NEXT_TETROMINOES_SHOWN } from "@/data/tetris";
import { getActionForKeyCode } from "@/utils/tetris/input";
import { playerController } from "@/utils/tetris/playerController";
import { checkCollision, getNewGridWithCellShape } from "@/utils/tetris/grid";
import TetrisGameGrid from "./TetrisGameGrid";

const TetrisGameController = forwardRef(function TetrisGameController(
  {
    isPlaying,
    resetGame,
    isGameOver,
    setIsGameOver,
    isGamePaused,
    setIsGamePaused,
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
    resetGame: () => void;
    isGameOver: boolean;
    setIsGameOver: SetStateFunction<boolean>;
    isGamePaused: boolean;
    setIsGamePaused: SetStateFunction<boolean>;
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
      resetGame();
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
      // Player collided whem moving down so set them in place
      const newGameGrid = getNewGridWithCellShape(
        gameGrid,
        player.tetromino.shape,
        player.position,
        player.tetromino.name,
        false,
      );

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

      // TODO: Check for cleared lines and Remove
      // TODO: Update gameScore
      addClearedLines(0); // TODO: Only here to keep linter quiet

      // Update the gameGride now we have processed the newGameGrid
      setGameGrid(newGameGrid);

      // Get the next tetromino and update the player
      nextPlayer();
    }
  }, frameInterval);

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
