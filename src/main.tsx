import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "@/App";
import Concentration from "@/Concentration";
import GameOfLife from "@/GameOfLife";
import Snake from "@/Snake";
import Tetris from "@/Tetris";
import Footer from "./components/Footer";

createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route
          path={process.env.NODE_ENV === "production" ? "/react-arcade" : "/"}
          element={<App />}
        />
        <Route path="/concentration" element={<Concentration />} />
        <Route path="/game-of-life" element={<GameOfLife />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="/tetris" element={<Tetris />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </>,
);
