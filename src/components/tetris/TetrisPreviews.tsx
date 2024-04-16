import { memo } from "react";
import { TetrisPlayer } from "@/tetris";
import TetrisPreview from "./TetrisPreview";

const TetrisPreviews = memo(function TetrisPreviews({
  player,
  isGamePlaying,
  isGameOver,
  isGamePaused,
}: {
  player: TetrisPlayer;
  isGamePlaying: boolean;
  isGameOver: boolean;
  isGamePaused: boolean;
}) {
  const previewTetrominoes = player.nextTetrominoes.slice().reverse();

  return (
    <div className="flex flex-col gap-3">
      {previewTetrominoes.map((tetromino, i) => (
        <TetrisPreview
          key={`preview-${i}`}
          tetromino={tetromino}
          isGamePlaying={isGamePlaying}
          isGameOver={isGameOver}
          isGamePaused={isGamePaused}
        />
      ))}
    </div>
  );
});

export default TetrisPreviews;
