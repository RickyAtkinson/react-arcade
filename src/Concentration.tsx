import Button from "@/components/Button";
import Navbar from "./components/Navbar";

export default function Snake() {
  return (
    <>
      <header className="container mx-auto px-8 pb-6 pt-6 text-center">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Concentration
        </h1>
        <Navbar>
          <Button color="yellow" hover="yellow">
            Test
          </Button>
        </Navbar>
      </header>
      <main className="container mx-auto flex-grow px-8">
        <p className="leading-7 [&:not(:first-child)]:mt-6">Coming soon...</p>
      </main>
    </>
  );
}
