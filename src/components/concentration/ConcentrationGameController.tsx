import { useEffect } from "react";
import { SetStateFunction } from "@/index";
import { ConcentrationCard, ConcentrationDeck } from "@/concentration";
import { TURN_RESET_DELAY } from "@/data/concentration";
import ConcentrationGameCard from "./ConcentrationGameCard";

export default function ConcentrationGameController({
  gameDeck,
  setGameDeck,
  choiceOne,
  setChoiceOne,
  choiceTwo,
  setChoiceTwo,
  setTurnNumber,
  isInputDisabled,
  setIsInputDisabled,
}: {
  gameDeck: ConcentrationDeck;
  setGameDeck: SetStateFunction<ConcentrationDeck>;
  choiceOne: ConcentrationCard | null;
  setChoiceOne: SetStateFunction<ConcentrationCard | null>;
  choiceTwo: ConcentrationCard | null;
  setChoiceTwo: SetStateFunction<ConcentrationCard | null>;
  setTurnNumber: SetStateFunction<number>;
  isInputDisabled: boolean;
  setIsInputDisabled: SetStateFunction<boolean>;
}) {
  function handleChoice(card: ConcentrationCard) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(() => {
    function resetTurn() {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurnNumber((prevTurnNumber) => prevTurnNumber + 1);
      setIsInputDisabled(false);
    }

    if (choiceOne && choiceTwo) {
      setIsInputDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setGameDeck((prevDeck) => {
          return prevDeck.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, isMatched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(resetTurn, TURN_RESET_DELAY);
      }
    }
  }, [
    choiceOne,
    choiceTwo,
    setIsInputDisabled,
    setGameDeck,
    setChoiceOne,
    setChoiceTwo,
    setTurnNumber,
  ]);

  return (
    <div className="mx-auto mt-6 grid max-w-md grid-cols-4 gap-4">
      {gameDeck.map((card) => (
        <ConcentrationGameCard
          key={card.id}
          card={card}
          isFlipped={card === choiceOne || card === choiceTwo || card.isMatched}
          disabled={isInputDisabled}
          handleSelection={(card) => handleChoice(card)}
        />
      ))}
    </div>
  );
}
