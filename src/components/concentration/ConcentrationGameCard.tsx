import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { ConcentrationCard } from "@/concentration";

export default function ConcentrationGameCard({
  card,
  isFlipped,
  disabled,
  handleSelection,
}: {
  card: ConcentrationCard;
  isFlipped: boolean;
  disabled: boolean;
  handleSelection: (card: ConcentrationCard) => void;
}) {
  return (
    <button
      disabled={disabled || isFlipped}
      className="relative drop-shadow-md"
      onClick={() => {
        handleSelection(card);
      }}
    >
      <img
        className={twMerge(
          clsx(
            "absolute left-0 top-0 block h-auto w-full transition-transform delay-150 ease-in",
            {
              "delay-0 [transform:rotateY(90deg)]": !isFlipped,
            },
          ),
        )}
        src={
          process.env.NODE_ENV === "production"
            ? "/react-arcade/" + card.src
            : card.src
        }
        alt="Card front"
      />
      <img
        className={twMerge(
          clsx("block h-auto w-full transition-transform delay-150 ease-in", {
            "delay-0 [transform:rotateY(90deg)]": isFlipped,
          }),
        )}
        src={
          process.env.NODE_ENV === "production"
            ? "/react-arcade/img/card-back-red.png"
            : "/img/card-back-red.png"
        }
        alt="Card back"
      />
    </button>
  );
}
