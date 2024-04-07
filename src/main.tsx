import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "@/App";
import Concentration from "@/Concentration";
import GameOfLife from "@/GameOfLife";
import Snake from "@/Snake";
import Tetris from "@/Tetris";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/concentration" element={<Concentration />} />
      <Route path="/game-of-life" element={<GameOfLife />} />
      <Route path="/snake" element={<Snake />} />
      <Route path="/tetris" element={<Tetris />} />
    </Routes>
  </BrowserRouter>,
);
