import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SnakeCell } from "@/snake";

export default function SnakeGridCell({
  cell,
  isGameOver,
  isGamePaused,
}: {
  cell: SnakeCell;
  isGameOver: boolean;
  isGamePaused: boolean;
}) {
  return (
    <div
      className={twMerge(
        clsx({
          "bg-green-800": cell.isOccupiedBy === "Snake",
          "bg-red-700": cell.isOccupiedBy === "Apple",
          "opacity-10": isGameOver || isGamePaused,
        }),
      )}
    ></div>
  );
}
