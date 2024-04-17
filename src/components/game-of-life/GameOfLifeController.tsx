import { GameOfLifeGrid } from "@/game-of-life";
import GameOfLifeGameGrid from "./GameOfLifeGameGrid";

export default function GameOfLifeController({
  gameGrid,
}: {
  gameGrid: GameOfLifeGrid;
}) {
  return <GameOfLifeGameGrid gameGrid={gameGrid} />;
}
