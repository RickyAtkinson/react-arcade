import { Link } from "react-router-dom";

export default function App() {
  const gameList = [
    { name: "Concentration", href: "/concentration" },
    { name: "Game of Life", href: "/game-of-life" },
    { name: "Snake", href: "/snake" },
    { name: "Tetris", href: "/tetris" },
  ];

  return (
    <>
      <header className="container mx-auto px-8 pb-6 pt-8 text-center">
        <h1 className="scroll-m-20 bg-gradient-to-br from-blue-700 to-purple-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent lg:text-5xl">
          React Arcade
        </h1>
      </header>
      <main className="container mx-auto max-w-screen-md flex-grow px-8 pb-6 text-center">
        <p className="mx-auto max-w-lg leading-7 [&:not(:first-child)]:mt-6">
          Welcome to React Arcade! These games have been made as an educational
          project and are by no means polished products.
        </p>
        <p className="mx-auto max-w-lg font-bold leading-7 [&:not(:first-child)]:mt-6">
          🚧 MOBILE SUPPORT COMING SOON 🚧
        </p>
        <p className="mx-auto max-w-lg leading-7 [&:not(:first-child)]:mt-6">
          Select a game below:
        </p>
        <div className="mx-auto mt-8 grid grid-cols-1 gap-3 text-xl md:grid-cols-2">
          {gameList.map((game) => (
            <Link
              to={game.href}
              className="rounded bg-zinc-900 p-6 font-bold tracking-tight transition-colors hover:bg-blue-700 md:py-16"
              key={game.name.toLowerCase().replaceAll(" ", "-")}
            >
              {game.name}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
