import { useState } from "react";
import Button from "@/components/Button";
import Navbar from "./components/Navbar";
import Modal from "@/components/Modal";

export default function Snake() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <header className="container mx-auto px-8 pb-6 pt-6 text-center">
        <h1 className="scroll-m-20 bg-gradient-to-br from-blue-700 to-purple-700 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent lg:text-4xl">
          Snake
        </h1>
        <Navbar>
          <Button disabled={true} hover="green">
            Play
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
        <p className="text-center font-bold leading-7 [&:not(:first-child)]:mt-6">
          Coming soon...
        </p>
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
