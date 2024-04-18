import { clsx } from "clsx";
import { Position } from "@/index";
import { GameOfLifeCell } from "@/game-of-life";

export default function GameOfLifeGridCell({
  cell,
  position,
  handleCellClick,
}: {
  cell: GameOfLifeCell;
  position: Position;
  handleCellClick: (position: Position) => void;
}) {
  return (
    <button
      className={clsx("border border-zinc-900 hover:border-zinc-500", {
        "bg-gradient-to-br from-neutral-400 to-neutral-500": cell.isAlive,
      })}
      onClick={() => handleCellClick(position)}
    ></button>
  );
}
