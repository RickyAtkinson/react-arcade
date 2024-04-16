import { useRef, useState } from "react";
import {
  POINT_MULTIPLIER_1_LINE,
  POINT_MULTIPLIER_2_LINE,
  POINT_MULTIPLIER_3_LINE,
  POINT_MULTIPLIER_4_LINE,
} from "./data/tetris";
import useGameGrid from "@/hooks/tetris/useGameGrid";
import usePlayer from "@/hooks/tetris/usePlayer";
import useGameStats from "@/hooks/tetris/useGameStats";
import useFrameInterval from "@/hooks/tetris/useFrameInterval";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import TetrisGameController from "@/components/tetris/TetrisGameController";
import TetrisStatsDisplay from "@/components/tetris/TetrisStatsDisplay";
import TetrisPreviews from "@/components/tetris/TetrisPreviews";
import Modal from "@/components/Modal";

export default function Tetris() {
  const gameControllerRef = useRef<HTMLButtonElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isGamePlaying, setIsGamePlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGamePaused, setIsGamePaused] = useState<boolean>(false);
  const [gameStats, addClearedLines, resetGameStats] = useGameStats();
  const [
    frameInterval,
    pauseFrameInterval,
    resumeFrameInterval,
    resetFrameInterval,
  ] = useFrameInterval(gameStats);
  const [gameGrid, setGameGrid, resetGameGrid] = useGameGrid();
  const [player, setPlayerPosition, setPlayerShape, nextPlayer, resetPlayer] =
    usePlayer();

  function startGame() {
    resetFrameInterval();
    setIsGamePlaying(true);
    gameControllerRef.current?.focus();
  }

  function quitGame() {
    setIsGamePlaying(false);
    setIsGameOver(false);
    setIsGamePaused(false);
    pauseFrameInterval();
    resetGameStats();
    resetPlayer();
    resetGameGrid();
  }

  function toggleGame() {
    isGamePlaying ? quitGame() : startGame();
  }

  function resetGame() {
    quitGame();
    startGame();
  }

  return (
    <>
      <header className="container mx-auto px-8 pb-6 pt-6 text-center">
        <h1 className="scroll-m-20 bg-gradient-to-br from-blue-700 to-purple-700 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent lg:text-4xl">
          Tetris
        </h1>
        <Navbar>
          <Button hover={isGamePlaying ? "red" : "green"} onClick={toggleGame}>
            {isGamePlaying ? "Quit" : "Play"}
          </Button>
          <Button disabled={!isGamePlaying} hover="blue" onClick={resetGame}>
            Reset
          </Button>
          <Button
            color="blue"
            hover="blue"
            onClick={() => {
              setShowModal(true);
            }}
          >
            ?
          </Button>
        </Navbar>
      </header>
      <main className="container mx-auto flex-grow px-8 pb-6">
        <div className="flex justify-center gap-3">
          <TetrisGameController
            ref={gameControllerRef}
            isGamePlaying={isGamePlaying}
            isGameOver={isGameOver}
            setIsGameOver={setIsGameOver}
            isGamePaused={isGamePaused}
            setIsGamePaused={setIsGamePaused}
            quitGame={quitGame}
            addClearedLines={addClearedLines}
            frameInterval={frameInterval}
            pauseFrameInterval={pauseFrameInterval}
            resumeFrameInterval={resumeFrameInterval}
            gameGrid={gameGrid}
            setGameGrid={setGameGrid}
            player={player}
            setPlayerPosition={setPlayerPosition}
            setPlayerShape={setPlayerShape}
            nextPlayer={nextPlayer}
          />
          <div className="flex flex-col justify-between">
            <TetrisPreviews
              player={player}
              isGamePlaying={isGamePlaying}
              isGameOver={isGameOver}
              isGamePaused={isGamePaused}
            />
            <TetrisStatsDisplay gameStats={gameStats} />
          </div>
        </div>
      </main>
      {showModal && (
        <Modal className="border-1 max-h-[80%] w-4/5 max-w-screen-sm overflow-y-auto rounded border border-zinc-700 bg-zinc-950 p-6 text-left">
          <header className="mb-6 flex justify-between">
            <h2 className="text-xl font-bold">Tetris Help</h2>
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
            Move and rotate falling pieces to form complete lines when they
            land. Completed lines are cleared from the grid and award points.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Clearing 10 lines moves the game to the next level. You earn more
            point at higher levels, but the pieces fall faster.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Try to keep the grid clear. If the grid becomes too full, it&apos;s
            game over!
          </p>
          <h3 className="leading text-lg font-semibold [&:not(:first-child)]:mt-6">
            Key Binds
          </h3>
          <table className="w-full [&:not(:first-child)]:mt-6">
            <thead>
              <tr className="border-b border-solid border-b-zinc-700 text-zinc-400">
                <th className="px-4 py-2">Key</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="even:bg-zinc-900">
                <td className="px-4 py-2">A or Left Arrow</td>
                <td className="px-4 py-2">Move Left</td>
              </tr>
              <tr className="even:bg-zinc-900">
                <td className="px-4 py-2">S or Down Arrow</td>
                <td className="px-4 py-2">Move Down</td>
              </tr>
              <tr className="even:bg-zinc-900">
                <td className="px-4 py-2">D or Right Arrow</td>
                <td className="px-4 py-2">Move Right</td>
              </tr>
              <tr className="even:bg-zinc-900">
                <td className="px-4 py-2">E or up Arrow</td>
                <td className="px-4 py-2">Rotate Clockwise</td>
              </tr>
              <tr className="even:bg-zinc-900">
                <td className="px-4 py-2">Q</td>
                <td className="px-4 py-2">Rotate Anticlockwise</td>
              </tr>
              <tr className="even:bg-zinc-900">
                <td className="px-4 py-2">Space</td>
                <td className="px-4 py-2">Drop Down</td>
              </tr>
              <tr className="even:bg-zinc-900">
                <td className="px-4 py-2">P</td>
                <td className="px-4 py-2">Pause Game</td>
              </tr>
              <tr className="even:bg-zinc-900">
                <td className="px-4 py-2">Escape</td>
                <td className="px-4 py-2">Quit Game</td>
              </tr>
            </tbody>
          </table>
          <h3 className="leading text-lg font-semibold [&:not(:first-child)]:mt-6">
            Scoring
          </h3>
          <table className="w-full [&:not(:first-child)]:mt-6">
            <thead>
              <tr className="border-b border-solid border-b-zinc-700 text-zinc-400">
                <th className="px-4 py-2">Lines Cleared</th>
                <th className="px-4 py-2">Points Awarded</th>
              </tr>
            </thead>
            <tbody>
              <tr className="even:bg-zinc-900">
                <td className="px-4 py-2">1 Line</td>
                <td className="px-4 py-2">{POINT_MULTIPLIER_1_LINE} * Level</td>
              </tr>
              <tr className="even:bg-zinc-900">
                <td className="px-4 py-2">2 Lines</td>
                <td className="px-4 py-2">{POINT_MULTIPLIER_2_LINE} * Level</td>
              </tr>
              <tr className="even:bg-zinc-900">
                <td className="px-4 py-2">3 Lines</td>
                <td className="px-4 py-2">{POINT_MULTIPLIER_3_LINE} * Level</td>
              </tr>
              <tr className="even:bg-zinc-900">
                <td className="px-4 py-2">4 Lines</td>
                <td className="px-4 py-2">{POINT_MULTIPLIER_4_LINE} * Level</td>
              </tr>
            </tbody>
          </table>
        </Modal>
      )}
    </>
  );
}
