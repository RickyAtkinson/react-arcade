import { Position } from "@/index";
import { GameOfLifeGrid } from "@/game-of-life";
import GameOfLifeGameGrid from "./GameOfLifeGameGrid";

export default function GameOfLifeController({
  gameGrid,
  handleCellClick,
}: {
  gameGrid: GameOfLifeGrid;
  handleCellClick: (position: Position) => void;
}) {
  return (
    <GameOfLifeGameGrid gameGrid={gameGrid} handleCellClick={handleCellClick} />
  );
}
