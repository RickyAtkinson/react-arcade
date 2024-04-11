import { useRef, useState } from "react";
import useGameBoard from "@/hooks/tetris/useGameGrid";
import usePlayer from "@/hooks/tetris/usePlayer";
import { useGameStats } from "./hooks/tetris/useGameStats";
import { useFrameInterval } from "./hooks/tetris/useFrameInterval";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import TetrisGameController from "@/components/tetris/TetrisGameController";
import TetrisStatsDisplay from "./components/tetris/TetrisStatsDisplay";
import TetrisPreviews from "./components/tetris/TetrisPreviews";

export default function Tetris() {
  const gameControllerRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGamePaused, setIsGamePaused] = useState<boolean>(false);
  const [gameStats, addClearedLines, resetGameStats] = useGameStats();
  const [
    frameInterval,
    pauseFrameInterval,
    resumeFrameInterval,
    resetFrameInterval,
  ] = useFrameInterval(gameStats);
  const [gameGrid, setGameGrid, resetGameGrid] = useGameBoard();
  const [player, setPlayerPosition, setPlayerShape, nextPlayer, resetPlayer] =
    usePlayer();

  function startGame() {
    resetFrameInterval();
    setIsPlaying(true);
    gameControllerRef.current?.focus();
  }

  function quitGame() {
    setIsPlaying(false);
    setIsGameOver(false);
    setIsGamePaused(false);
    pauseFrameInterval();
    resetGameStats();
    resetPlayer();
    resetGameGrid();
  }

  function toggleGame() {
    isPlaying ? quitGame() : startGame();
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
          <Button hover={isPlaying ? "red" : "green"} onClick={toggleGame}>
            {isPlaying ? "Quit" : "Play"}
          </Button>
          <Button disabled={!isPlaying} hover="blue" onClick={resetGame}>
            Reset
          </Button>
        </Navbar>
      </header>
      <main className="container mx-auto flex-grow px-8 pb-6">
        <div className="flex justify-center gap-3">
          <TetrisGameController
            ref={gameControllerRef}
            isPlaying={isPlaying}
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
              isPlaying={isPlaying}
              isGameOver={isGameOver}
              isGamePaused={isGamePaused}
            />
            <TetrisStatsDisplay gameStats={gameStats} />
          </div>
        </div>
      </main>
    </>
  );
}
