import { useState } from "react";
import { ConcentrationCard, ConcentrationDeck } from "./concentration";
import { cardFaceImages } from "./data/concentration";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import ConcentrationGameController from "./components/concentration/ConcentrationGameController";

export default function Snake() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isGamePlaying, setIsGamePlaying] = useState<boolean>(false);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [gameDeck, setGameDeck] = useState<ConcentrationDeck>([]);
  const [, setTurnNumber] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<ConcentrationCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<ConcentrationCard | null>(null);

  function startGame() {
    const newDeck = [...cardFaceImages, ...cardFaceImages].map(
      (card, index): ConcentrationCard => ({
        ...card,
        id: `card-${index}`,
        isMatched: false,
      }),
    );

    // Shuffle the deck using the Fisher-Yates algorithm
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }

    setGameDeck(newDeck);
    setIsInputDisabled(false);
    setIsGamePlaying(true);
  }

  function quitGame() {
    setIsGamePlaying(false);
    setIsInputDisabled(true);
    setTurnNumber(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setGameDeck([]);
  }

  function resetGame() {
    quitGame();
    startGame();
  }

  return (
    <>
      <header className="container mx-auto px-8 pb-6 pt-6 text-center">
        <h1 className="scroll-m-20 bg-gradient-to-br from-blue-700 to-purple-700 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent lg:text-4xl">
          Concentration
        </h1>
        <Navbar>
          <Button
            hover={isGamePlaying ? "red" : "green"}
            onClick={() => (isGamePlaying ? resetGame() : startGame())}
          >
            {isGamePlaying ? "Reset" : "Play"}
          </Button>
          <Button disabled={!isGamePlaying} hover="red" onClick={quitGame}>
            Quit
          </Button>
          <Button
            color="blue"
            hover="blue"
            ariaLabel="Help"
            onClick={() => {
              setShowModal(true);
            }}
          >
            ?
          </Button>
        </Navbar>
      </header>
      <main className="container mx-auto flex-grow px-8 pb-6">
        <ConcentrationGameController
          gameDeck={gameDeck}
          setGameDeck={setGameDeck}
          choiceOne={choiceOne}
          setChoiceOne={setChoiceOne}
          choiceTwo={choiceTwo}
          setChoiceTwo={setChoiceTwo}
          setTurnNumber={setTurnNumber}
          isInputDisabled={isInputDisabled}
          setIsInputDisabled={setIsInputDisabled}
        />
      </main>
      {showModal && (
        <Modal className="border-1 max-h-[80%] w-4/5 max-w-screen-sm rounded border border-zinc-700 bg-zinc-950 p-6 text-left">
          <header className="mb-6 flex justify-between">
            <h2 className="text-xl font-bold">Concentration Help</h2>
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="font-bold leading-none hover:text-red-500"
            >
              Close
            </button>
          </header>
          <p className="leading-7 [&:not(:first-child)]:mt-6">Coming soon.</p>
        </Modal>
      )}
    </>
  );
}
