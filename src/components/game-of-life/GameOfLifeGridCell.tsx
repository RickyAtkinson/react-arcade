import { clsx } from "clsx";
import { GameOfLifeCell } from "@/game-of-life";

export default function GameOfLifeGridCell({ cell }: { cell: GameOfLifeCell }) {
  return (
    <button
      className={clsx("border border-zinc-900", {
        "bg-gradient-to-br from-neutral-500 to-neutral-600": cell.isAlive,
      })}
    ></button>
  );
}
