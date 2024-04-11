import Button from "@/components/Button";
import Navbar from "./components/Navbar";

export default function GameOfLife() {
  return (
    <>
      <header className="container mx-auto px-8 pb-6 pt-6 text-center">
        <h1 className="scroll-m-20 bg-gradient-to-br from-blue-700 to-purple-700 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent lg:text-4xl">
          Game of Life
        </h1>
        <Navbar>
          <Button disabled={true} hover="green">
            Play
          </Button>
        </Navbar>
      </header>
      <main className="container mx-auto flex-grow px-8">
        <p className="text-center font-bold leading-7 [&:not(:first-child)]:mt-6">
          Coming soon...
        </p>
      </main>
    </>
  );
}
