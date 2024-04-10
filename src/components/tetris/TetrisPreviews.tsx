import { memo } from "react";
import { TetrisPlayer } from "@/tetris";
import TetrisPreview from "./TetrisPreview";

const TetrisPreviews = memo(function TetrisPreviews({
  player,
  isPlaying,
}: {
  player: TetrisPlayer;
  isPlaying: boolean;
}) {
  const previewTetrominoes = player.nextTetrominoes.slice().reverse();

  return (
    <div className="flex flex-col gap-2">
      {previewTetrominoes.map((tetromino, i) => (
        <TetrisPreview
          key={`preview-${i}`}
          tetromino={tetromino}
          isPlaying={isPlaying}
        />
      ))}
    </div>
  );
});

export default TetrisPreviews;
