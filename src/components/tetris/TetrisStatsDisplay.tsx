import { memo } from "react";
import { TetrisGameStats } from "@/tetris";

const TetrisStatsDisplay = memo(function GameStatsDisplay({
  gameStats,
}: {
  gameStats: TetrisGameStats;
}) {
  const { level, points } = gameStats;

  return (
    <ul>
      <li className="text-zinc-400">Level</li>
      <li className="mb-4 text-3xl font-bold">{level}</li>
      <li className="text-zinc-400">Points</li>
      <li className="text-xl font-bold">{points}</li>
    </ul>
  );
});

export default TetrisStatsDisplay;
