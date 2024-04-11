import { memo } from "react";
import { TetrisPlayer } from "@/tetris";
import TetrisPreview from "./TetrisPreview";

const TetrisPreviews = memo(function TetrisPreviews({
  player,
  isPlaying,
  isGameOver,
  isGamePaused,
}: {
  player: TetrisPlayer;
  isPlaying: boolean;
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
          isPlaying={isPlaying}
          isGameOver={isGameOver}
          isGamePaused={isGamePaused}
        />
      ))}
    </div>
  );
});

export default TetrisPreviews;
