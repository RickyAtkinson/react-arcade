import { useRef, useState } from "react";
import { useGameBoard } from "./hooks/tetris/useGameGrid";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import TetrisGameController from "@/components/tetris/TetrisGameController";

export default function Tetris() {
  const gameControllerRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gameGrid, , clearGameGrid] = useGameBoard();

  function startGame() {
    setIsPlaying(true);
    gameControllerRef.current?.focus();
  }

  function resetGame() {
    setIsPlaying(false);
    clearGameGrid();
  }

  function toggleGame() {
    isPlaying ? resetGame() : startGame();
  }

  return (
    <>
      <header className="container mx-auto px-8 pb-6 pt-6 text-center">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Tetris
        </h1>
        <Navbar>
          <Button hover={isPlaying ? "red" : "green"} onClick={toggleGame}>
            {isPlaying ? "Reset" : "Play"}
          </Button>
        </Navbar>
      </header>
      <main className="container mx-auto flex-grow px-8">
        <div className="flex justify-around">
          <TetrisGameController gameGrid={gameGrid} ref={gameControllerRef} />
        </div>
      </main>
    </>
  );
}
