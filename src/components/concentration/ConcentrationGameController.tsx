import { ConcentrationDeck } from "@/concentration";

export default function ConcentrationGameController({
  gameDeck,
}: {
  gameDeck: ConcentrationDeck;
}) {
  return (
    <div className="mx-auto grid max-w-lg grid-cols-4 gap-4">
      {gameDeck.map((card) => (
        <img src={card.src} alt="Concentration game card" />
      ))}
    </div>
  );
}
