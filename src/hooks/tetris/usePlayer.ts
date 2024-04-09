import { useCallback, useState } from "react";
import { Position, SetStateFunction } from "@/index";
import { TetrisPlayer, TetrisTetromino } from "@/tetris";
import { getRandomTetromino } from "@/utils/tetris/tetrominoes";

export const initialPosition: Position = { x: 4, y: 0 };

function createTetrisPlayer(): TetrisPlayer {
  const tetrominoList: TetrisTetromino[] = Array(4)
    .fill(0)
    .map(() => getRandomTetromino());

  return {
    tetromino: tetrominoList.pop()!,
    position: initialPosition,
    nextTetrominoes: tetrominoList,
  };
}

export default function usePlayer(): [
  TetrisPlayer,
  SetStateFunction<TetrisPlayer>,
  () => void,
  () => void,
] {
  const [player, setPlayer] = useState(createTetrisPlayer());

  const nextPlayer = useCallback(() => {
    setPlayer((prev): TetrisPlayer => {
      const tetrominoList = prev.nextTetrominoes;
      tetrominoList.push(getRandomTetromino());

      return {
        tetromino: tetrominoList.pop()!,
        position: initialPosition,
        nextTetrominoes: tetrominoList,
      };
    });
  }, []);

  const resetPlayer = useCallback(() => {
    setPlayer(createTetrisPlayer());
  }, []);

  return [player, setPlayer, nextPlayer, resetPlayer];
}