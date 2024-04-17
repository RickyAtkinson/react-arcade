import { clsx } from "clsx";
import { GameOfLifeCell } from "@/game-of-life";

export default function GameOfLifeGridCell({ cell }: { cell: GameOfLifeCell }) {
  return (
    <button
      className={clsx("border border-zinc-900", {
        "bg-gradient-to-br from-neutral-400 to-neutral-500": cell.isAlive,
      })}
    ></button>
  );
}
