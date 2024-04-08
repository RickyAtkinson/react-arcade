import Button from "@/components/Button";
import Navbar from "./components/Navbar";
import Footer from "@/components/Footer";

export default function Tetris() {
  return (
    <>
      <header className="container mx-auto px-8 pb-6 pt-6 text-center">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Tetris
        </h1>
        <Navbar>
          <Button color="blue" hover="blue">
            Test
          </Button>
        </Navbar>
      </header>
        <p className="leading-7 [&:not(:first-child)]:mt-6">Coming soon...</p>
      <main className="container mx-auto flex-grow px-8">
      </main>
      <Footer />
    </>
  );
}
