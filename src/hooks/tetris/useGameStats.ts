import { useState, useCallback } from "react";
import { TetrisGameStats } from "@/tetris";
import { LINES_PER_LEVEL } from "@/data/tetris";

const getDefaultGameStats: TetrisGameStats = {
  level: 1,
  linesCompleted: 0,
  points: 0,
};

export function useGameStats(): [
  TetrisGameStats,
  (clearedLines: number) => void,
  () => void,
] {
  const [gameStats, setGameStats] = useState({ ...getDefaultGameStats });

  const addClearedLines = useCallback((clearedLines: number) => {
    setGameStats((prev) => {
      const points = prev.points + clearedLines * 100;
      const newLinesCompleted = prev.linesCompleted + clearedLines;
      const level =
        newLinesCompleted >= LINES_PER_LEVEL ? prev.level + 1 : prev.level;
      const linesCompleted = newLinesCompleted % LINES_PER_LEVEL;

      return {
        level,
        linesCompleted,
        points,
      };
    });
  }, []);

  const resetGameStats = useCallback(() => {
    setGameStats({ ...getDefaultGameStats });
  }, []);

  return [gameStats, addClearedLines, resetGameStats];
}
