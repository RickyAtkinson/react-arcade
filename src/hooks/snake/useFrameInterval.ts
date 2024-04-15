import { useState, useCallback, useEffect } from "react";
import {
  DEFAULT_FRAME_INTERVAL,
  MINIMUM_FRAME_INTERVAL,
  FRAME_INTERVAL_DECREMENT,
  POINTS_PER_APPLE,
} from "@/data/snake";

export default function useFrameInterval(
  gameScore: number,
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
    const intervalDecrement =
      FRAME_INTERVAL_DECREMENT * (gameScore / POINTS_PER_APPLE);
    const newInterval = Math.max(
      DEFAULT_FRAME_INTERVAL - intervalDecrement,
      MINIMUM_FRAME_INTERVAL,
    );
    setFrameInterval(newInterval);
  }, [gameScore]);

  return [
    frameInterval,
    pauseFrameInterval,
    resumeFrameInterval,
    resetFrameInterval,
  ];
}
