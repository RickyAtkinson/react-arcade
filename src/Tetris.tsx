import { useRef, useState } from "react";
import useGameBoard from "@/hooks/tetris/useGameGrid";
import usePlayer from "@/hooks/tetris/usePlayer";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import TetrisGameController from "@/components/tetris/TetrisGameController";

export default function Tetris() {
  const gameControllerRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gameGrid, setGameGrid, resetGameGrid] = useGameBoard();
  const [player, setPlayer, nextPlayer, resetPlayer] = usePlayer();

  function startGame() {
    setIsPlaying(true);
    gameControllerRef.current?.focus();
  }

  function resetGame() {
    setIsPlaying(false);
    resetPlayer();
    resetGameGrid();
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
          <TetrisGameController
            ref={gameControllerRef}
            isPlaying={isPlaying}
            gameGrid={gameGrid}
            setGameGrid={setGameGrid}
            player={player}
            setPlayer={setPlayer}
            nextPlayer={nextPlayer}
          />
        </div>
      </main>
    </>
  );
}
