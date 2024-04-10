import { useCallback, useState } from "react";
import { Position } from "@/index";
import { TetrisPlayer, TetrisShape, TetrisTetromino } from "@/tetris";
import { INITIAL_PLAYER_POSITION, NEXT_TETROMINOES_SHOWN } from "@/data/tetris";
import { getRandomTetromino } from "@/utils/tetris/tetrominoes";

function createTetrisPlayer(): TetrisPlayer {
  const tetrominoList: TetrisTetromino[] = Array(NEXT_TETROMINOES_SHOWN + 1)
    .fill(0)
    .map(() => getRandomTetromino());

  return {
    tetromino: tetrominoList.pop()!,
    position: INITIAL_PLAYER_POSITION,
    nextTetrominoes: tetrominoList,
  };
}

export default function usePlayer(): [
  TetrisPlayer,
  (position: Position) => void,
  (shape: TetrisShape) => void,
  () => void,
  () => void,
] {
  const [player, setPlayer] = useState(createTetrisPlayer());

  const setPlayerPosition = useCallback((position: Position) => {
    setPlayer((prev) => ({
      tetromino: prev.tetromino,
      position: { x: position.x, y: position.y },
      nextTetrominoes: prev.nextTetrominoes,
    }));
  }, []);

  const setPlayerShape = useCallback((shape: TetrisShape) => {
    setPlayer((prev) => ({
      tetromino: { name: prev.tetromino.name, shape: shape },
      position: prev.position,
      nextTetrominoes: prev.nextTetrominoes,
    }));
  }, []);

  const nextPlayer = useCallback(() => {
    setPlayer((prev): TetrisPlayer => {
      const tetrominoList = prev.nextTetrominoes;
      tetrominoList.unshift(getRandomTetromino());

      return {
        tetromino: tetrominoList.pop()!,
        position: INITIAL_PLAYER_POSITION,
        nextTetrominoes: tetrominoList,
      };
    });
  }, []);

  const resetPlayer = useCallback(() => {
    setPlayer(createTetrisPlayer());
  }, []);

  return [player, setPlayerPosition, setPlayerShape, nextPlayer, resetPlayer];
}
