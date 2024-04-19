import { useState } from "react";
import useGameGrid from "./hooks/game-of-life/useGameGrid";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import GameOfLifeController from "./components/game-of-life/GameOfLifeController";

export default function GameOfLife() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isGamePlaying, setIsGamePlaying] = useState<boolean>(false);
  const [gameGrid, setGameGrid, resetGameGrid, randomizeGameGrid] =
    useGameGrid();

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
            Clear
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
        <GameOfLifeController
          isGamePlaying={isGamePlaying}
          gameGrid={gameGrid}
          setGameGrid={setGameGrid}
        />
      </main>
      {showModal && (
        <Modal className="border-1 max-h-[80%] w-4/5 max-w-screen-sm overflow-y-auto rounded border border-zinc-700 bg-zinc-950 p-6 text-left">
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
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Conway&apos;s Game of Life.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            In Game of Life you are presented with a grid of cells that can
            either be alive or dead. Alive cells will be lit up to indicate
            their state.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Each generation, cells may change state depending on their
            neighbours. See the rules below to learn more.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Click cells to toggle them or click the &quot;Random&quot; button to
            choose an initial state then press &quot;Play&quot; to begin the
            simulation.
          </p>
          <h3 className="leading text-lg font-semibold [&:not(:first-child)]:mt-6">
            Rules
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            At each step in time, the following transitions occur:
          </p>
          <ol className="list-inside list-decimal leading-7 [&:not(:first-child)]:mt-6">
            <li>
              Any live cell with fewer than two live neighbors dies by
              underpopulation.
            </li>
            <li>
              Any live cell with two or three live neighbors lives on to the
              next generation.
            </li>
            <li>
              Any live cell with more than three live neighbors dies by
              overpopulation.
            </li>
            <li>
              Any dead cell with exactly three live neighbors becomes a live
              cell, as if by reproduction.
            </li>
          </ol>
        </Modal>
      )}
    </>
  );
}
