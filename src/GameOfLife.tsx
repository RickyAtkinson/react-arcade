import { useState } from "react";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import useGameGrid from "./hooks/game-of-life/useGameGrid";
import GameOfLifeController from "./components/game-of-life/GameOfLifeController";

export default function GameOfLife() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isGamePlaying, setIsGamePlaying] = useState<boolean>(false);
  const [gameGrid, , resetGameGrid, randomizeGameGrid] = useGameGrid();

  return (
    <>
      <header className="container mx-auto px-8 pb-6 pt-6 text-center">
        <h1 className="scroll-m-20 bg-gradient-to-br from-blue-700 to-purple-700 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent lg:text-4xl">
          Game of Life
        </h1>
        <Navbar>
          <Button
            hover={isGamePlaying ? "red" : "green"}
            onClick={() => {
              setIsGamePlaying(!isGamePlaying);
            }}
          >
            {isGamePlaying ? "Stop" : "Start"}
          </Button>
          <Button
            disabled={isGamePlaying}
            hover="yellow"
            onClick={randomizeGameGrid}
          >
            Random
          </Button>
          <Button disabled={isGamePlaying} hover="red" onClick={resetGameGrid}>
            Reset
          </Button>
          <Button
            color="blue"
            hover="blue"
            ariaLabel="Help"
            onClick={() => {
              setIsGamePlaying(false);
              setShowModal(true);
            }}
          >
            ?
          </Button>
        </Navbar>
      </header>
      <main className="container mx-auto flex-grow px-8 pb-6">
        <GameOfLifeController gameGrid={gameGrid} />
      </main>
      {showModal && (
        <Modal className="border-1 max-h-[80%] w-4/5 max-w-screen-sm rounded border border-zinc-700 bg-zinc-950 p-6 text-left">
          <header className="mb-6 flex justify-between">
            <h2 className="text-xl font-bold">Game of Life Help</h2>
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
