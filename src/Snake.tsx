import { useRef, useState } from "react";
import { Position } from "@/index";
import { Direction } from "@/snake";
import { INITIAL_APPLE, INITIAL_DIRECTION, INITIAL_SNAKE } from "@/data/snake";
import useGameGrid from "@/hooks/snake/useGameGrid";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import SnakeGameController from "@/components/snake/SnakeGameController";
import useFrameInterval from "./hooks/snake/useFrameInterval";

export default function Snake() {
  const gameControllerRef = useRef<HTMLButtonElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isGamePlaying, setIsGamePlaying] = useState<boolean>(false);
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGamePaused, setIsGamePaused] = useState<boolean>(false);
  const [gameScore, setGameScore] = useState<number>(0);
  const [
    frameInterval,
    pauseFrameInterval,
    resumeFrameInterval,
    resetFrameInterval,
  ] = useFrameInterval(gameScore);
  const [gameGrid, setGameGrid, resetGameGrid] = useGameGrid();
  const [snake, setSnake] = useState<Position[]>([...INITIAL_SNAKE]);
  const [apple, setApple] = useState<Position>({ ...INITIAL_APPLE });
  const [direction, setDirection] = useState<Direction>({
    ...INITIAL_DIRECTION,
  });

  function startGame() {
    setIsGamePlaying(true);
    gameControllerRef.current?.focus();
  }

  function quitGame() {
    setIsGamePlaying(false);
    setIsGameComplete(false);
    setIsGameOver(false);
    setIsGamePaused(false);
    setGameScore(0);
    resetFrameInterval(); // TODO: Is this needed with the useEffect updating it on new gaem scores?
    resetGameGrid();
    setSnake([...INITIAL_SNAKE]);
    setApple({ ...INITIAL_APPLE });
    setDirection({ ...INITIAL_DIRECTION });
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
          Snake
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
          <SnakeGameController
            isGamePlaying={isGamePlaying}
            isGameComplete={isGameComplete}
            setIsGameComplete={setIsGameComplete}
            isGameOver={isGameOver}
            setIsGameOver={setIsGameOver}
            isGamePaused={isGamePaused}
            setIsGamePaused={setIsGamePaused}
            gameScore={gameScore}
            setGameScore={setGameScore}
            frameInterval={frameInterval}
            pauseFrameInterval={pauseFrameInterval}
            resumeFrameInterval={resumeFrameInterval}
            ref={gameControllerRef}
            gameGrid={gameGrid}
            setGameGrid={setGameGrid}
            snake={snake}
            setSnake={setSnake}
            apple={apple}
            setApple={setApple}
            direction={direction}
            setDirection={setDirection}
            quitGame={quitGame}
          />
        </div>
      </main>
      {showModal && (
        <Modal className="border-1 max-h-[80%] w-4/5 max-w-screen-sm rounded border border-zinc-700 bg-zinc-950 p-6 text-left">
          <header className="mb-6 flex justify-between">
            <h2 className="text-xl font-bold">Snake Help</h2>
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
                <td className="px-4 py-2">W or Up Arrow</td>
                <td className="px-4 py-2">Move Down</td>
              </tr>
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
            </tbody>
          </table>
        </Modal>
      )}
    </>
  );
}
