import { useState, useCallback, useEffect } from "react";
import { TetrisGameStats } from "@/tetris";
import {
  DEFAULT_FRAME_INTERVAL,
  MINIMUM_FRAME_INTERVAL,
  FRAME_INTERVAL_DECREMENT,
} from "@/data/tetris";

export function useFrameInterval(
  gameStats: TetrisGameStats,
): [number | null, () => void, () => void, () => void] {
  const [frameInterval, setFrameInterval] = useState<number | null>(null);
  const [prevFrameInterval, setPrevFrameInterval] = useState<number | null>(
    null,
  );

  const pauseFrameInterval = useCallback(() => {
    if (frameInterval) setPrevFrameInterval(frameInterval);

    setFrameInterval(null);
  }, [frameInterval, setPrevFrameInterval]);

  const resumeFrameInterval = useCallback(() => {
    if (!prevFrameInterval) return;

    setFrameInterval(prevFrameInterval);
    setPrevFrameInterval(null);
  }, [prevFrameInterval]);

  const resetFrameInterval = useCallback(() => {
    setFrameInterval(DEFAULT_FRAME_INTERVAL);
  }, [setFrameInterval]);

  useEffect(() => {
    const intervalDecrement = FRAME_INTERVAL_DECREMENT * (gameStats.level - 1);
    const newInterval = Math.max(
      DEFAULT_FRAME_INTERVAL - intervalDecrement,
      MINIMUM_FRAME_INTERVAL,
    );
    setFrameInterval(newInterval);
  }, [gameStats.level, setFrameInterval]);

  return [
    frameInterval,
    pauseFrameInterval,
    resumeFrameInterval,
    resetFrameInterval,
  ];
}
