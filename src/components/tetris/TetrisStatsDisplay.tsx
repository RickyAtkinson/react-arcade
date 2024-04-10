import { memo } from "react";
import { TetrisGameStats } from "@/tetris";
import { LINES_PER_LEVEL } from "@/data/tetris";

const TetrisStatsDisplay = memo(function GameStatsDisplay({
  gameStats,
}: {
  gameStats: TetrisGameStats;
}) {
  const { level, points, linesCompleted } = gameStats;
  const linesToLevel = LINES_PER_LEVEL - linesCompleted;

  return (
    <ul>
      <li className="text-zinc-400">Level</li>
      <li className="mb-4 text-4xl font-bold">{level}</li>
      <li className="text-zinc-400">Lines to level</li>
      <li className="mb-4 text-4xl font-bold">{linesToLevel}</li>
      <li className="text-zinc-400">Points</li>
      <li className="text-4xl font-bold">{points}</li>
    </ul>
  );
});

export default TetrisStatsDisplay;
