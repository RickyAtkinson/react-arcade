import { useState } from "react";
import { useGameBoard } from "./hooks/tetris/useGameGrid";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import TetrisGameBoard from "@/components/tetris/TetrisGameBoard";
import Footer from "@/components/Footer";

export default function Tetris() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gameGrid, , clearGameGrid] = useGameBoard();

  function startGame() {
    clearGameGrid();
    setIsPlaying(true);
  }

  return (
    <>
      <header className="container mx-auto px-8 pb-6 pt-6 text-center">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Tetris
        </h1>
        <Navbar>
          <Button disabled={isPlaying} hover="green" onClick={startGame}>
            Start
          </Button>
        </Navbar>
      </header>
      <main className="container mx-auto flex flex-grow justify-around px-8">
        <TetrisGameBoard gameGrid={gameGrid} />
      </main>
      <Footer />
    </>
  );
}
