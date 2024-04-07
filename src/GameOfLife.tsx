import Button from "@/components/Button";
import Navbar from "./components/Navbar";

export default function GameOfLife() {
  return (
    <>
      <header className="container mx-auto px-8 pb-6 pt-6 text-center">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Game of Life
        </h1>
        <Navbar>
          <Button color="red">Test</Button>
        </Navbar>
      </header>
      <main className="container mx-auto px-8 text-center">
        <p className="leading-7 [&:not(:first-child)]:mt-6">Coming soon...</p>
      </main>
    </>
  );
}
