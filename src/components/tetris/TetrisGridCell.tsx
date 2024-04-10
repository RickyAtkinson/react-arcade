import { TetrisCell } from "@/tetris";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function TetrisGridCell({ cell }: { cell: TetrisCell }) {
  return (
    <div
      className={twMerge(
        clsx("border-4 border-solid border-transparent", {
          "border-sky-400 border-b-sky-500 border-t-sky-200 bg-sky-300":
            cell.occupiedBy === "I",
          "border-blue-800 border-b-blue-900 border-t-blue-600 bg-blue-700":
            cell.occupiedBy === "J",
          "border-orange-500 border-b-orange-600 border-t-orange-300 bg-orange-400":
            cell.occupiedBy === "L",
          "border-yellow-400 border-b-yellow-500 border-t-yellow-200 bg-yellow-300":
            cell.occupiedBy === "O",
          "border-lime-500 border-b-lime-600 border-t-lime-300 bg-lime-400":
            cell.occupiedBy === "S",
          "border-purple-700 border-b-purple-800 border-t-purple-500 bg-purple-600":
            cell.occupiedBy === "T",
          "border-red-700 border-b-red-800 border-t-red-500 bg-red-600":
            cell.occupiedBy === "Z",
          "border-2 border-zinc-800": cell.occupiedBy === "Ghost",
        }),
      )}
    ></div>
  );
}
