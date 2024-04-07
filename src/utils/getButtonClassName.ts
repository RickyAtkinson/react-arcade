import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export default function getButtonClassName(
  color: "gray" | "red" | "green" | "blue" | "yellow" = "gray",
) {
  return twMerge(
    clsx("rounded px-8 py-2 font-bold transition duration-200", {
      "bg-zinc-900 hover:bg-zinc-700": color === "gray",
      "bg-red-900 hover:bg-red-700": color === "red",
      "bg-green-900 hover:bg-green-700": color === "green",
      "bg-blue-900 hover:bg-blue-700": color === "blue",
      "bg-yellow-900 hover:bg-yellow-700": color === "yellow",
    }),
  );
}
