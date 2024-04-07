import Button from "@/components/Button";
import Navbar from "./components/Navbar";

export default function Tetris() {
  return (
    <>
      <header className="container mx-auto px-8 pb-6 pt-6 text-center">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Tetris
        </h1>
        <Navbar>
          <Button color="blue">Test</Button>
        </Navbar>
      </header>
      <main className="container mx-auto px-8 text-center">
        <p className="leading-7 [&:not(:first-child)]:mt-6">Coming soon...</p>
      </main>
    </>
  );
}
