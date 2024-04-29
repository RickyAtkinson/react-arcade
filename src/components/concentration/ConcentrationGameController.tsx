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
  turnNumber,
  setTurnNumber,
  isInputDisabled,
  setIsInputDisabled,
  isGameComplete,
  setIsGameComplete,
}: {
  gameDeck: ConcentrationDeck;
  setGameDeck: SetStateFunction<ConcentrationDeck>;
  choiceOne: ConcentrationCard | null;
  setChoiceOne: SetStateFunction<ConcentrationCard | null>;
  choiceTwo: ConcentrationCard | null;
  setChoiceTwo: SetStateFunction<ConcentrationCard | null>;
  turnNumber: number;
  setTurnNumber: SetStateFunction<number>;
  isInputDisabled: boolean;
  setIsInputDisabled: SetStateFunction<boolean>;
  isGameComplete: boolean;
  setIsGameComplete: SetStateFunction<boolean>;
}) {
  function handleChoice(card: ConcentrationCard) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  function checkIsGameComplete(gameDeck: ConcentrationDeck) {
    if (gameDeck.length < 1) return false;
    for (let i = 0; i < gameDeck.length; i++) {
      if (gameDeck[i].isMatched === false) return false;
    }
    return true;
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

  useEffect(() => {
    console.log(gameDeck);
    if (checkIsGameComplete(gameDeck)) setIsGameComplete(true);
  }, [gameDeck, setIsGameComplete]);

  return (
    <div className="relative">
      <div className="mx-auto mt-6 grid max-w-md grid-cols-4 gap-4">
        {gameDeck.map((card) => (
          <ConcentrationGameCard
            key={card.id}
            card={card}
            isFlipped={
              card === choiceOne || card === choiceTwo || card.isMatched
            }
            disabled={isInputDisabled}
            handleSelection={(card) => handleChoice(card)}
          />
        ))}
      </div>
      {isGameComplete && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded border border-solid border-zinc-50 bg-zinc-900 bg-opacity-95 p-5">
          <h2 className="text-xl font-bold">Congractulations!</h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            You completed the game in {turnNumber} turns!
          </p>
        </div>
      )}
    </div>
  );
}
