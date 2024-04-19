import { Position, SetStateFunction } from "@/index";
import { GameOfLifeGrid } from "@/game-of-life";
import GameOfLifeGameGrid from "./GameOfLifeGameGrid";

export default function GameOfLifeController({
  gameGrid,
  setGameGrid,
}: {
  gameGrid: GameOfLifeGrid;
  setGameGrid: SetStateFunction<GameOfLifeGrid>;
}) {
  function handleCellClick(position: Position) {
    const gridCopy = [...gameGrid];
    gridCopy[position.y][position.x].isAlive =
      !gridCopy[position.y][position.x].isAlive;
    setGameGrid(gridCopy);
  }

  return (
    <GameOfLifeGameGrid gameGrid={gameGrid} handleCellClick={handleCellClick} />
  );
}
