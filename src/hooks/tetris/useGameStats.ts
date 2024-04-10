import { useState, useCallback } from "react";
import { TetrisGameStats } from "@/tetris";
import {
  LINES_PER_LEVEL,
  POINT_MULTIPLIER_1_LINE,
  POINT_MULTIPLIER_2_LINE,
  POINT_MULTIPLIER_3_LINE,
  POINT_MULTIPLIER_4_LINE,
} from "@/data/tetris";

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
      let multiplier = POINT_MULTIPLIER_1_LINE;

      if (clearedLines === 2) multiplier = POINT_MULTIPLIER_2_LINE;
      else if (clearedLines === 3) multiplier = POINT_MULTIPLIER_3_LINE;
      else if (clearedLines >= 4) multiplier = POINT_MULTIPLIER_4_LINE;

      const points = prev.points + prev.level * multiplier;
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
