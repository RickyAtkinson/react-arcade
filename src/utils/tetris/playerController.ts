import { Position } from "@/index";
import { TetrisAction, TetrisGrid, TetrisPlayer, TetrisShape } from "@/tetris";
import { checkCollision } from "./grid";
import { getRotatedShape } from "./tetrominoes";
import { ROWS } from "@/data/tetris";

function attemptPlayerMove(
  action: TetrisAction,
  player: TetrisPlayer,
  gameGrid: TetrisGrid,
  setPlayerPosition: (position: Position) => void,
) {
  const desiredPosition = { ...player.position };

  if (action === "MoveDown") {
    desiredPosition.y++;
  } else if (action === "MoveLeft") {
    desiredPosition.x--;
  } else if (action === "MoveRight") {
    desiredPosition.x++;
  } else return;

  if (checkCollision(gameGrid, desiredPosition, player.tetromino.shape)) return;

  setPlayerPosition(desiredPosition);
}

function attemptPlayerRotate(
  action: TetrisAction,
  player: TetrisPlayer,
  gameGrid: TetrisGrid,
  setPlayerShape: (shape: TetrisShape) => void,
) {
  const direction = action === "RotateClockwise" ? 1 : -1;
  const desiredRotation = getRotatedShape(player.tetromino.shape, direction);

  if (checkCollision(gameGrid, player.position, desiredRotation)) return;

  setPlayerShape(desiredRotation);
}

export function getPlayerDropPosition(
  player: TetrisPlayer,
  gameGrid: TetrisGrid,
): Position {
  const loopEnd = ROWS - player.position.y + 1;
  let y = 0;

  for (let i = 0; i < loopEnd; i++) {
    const checkPos = { x: player.position.x, y: player.position.y + i };
    const collided = checkCollision(gameGrid, checkPos, player.tetromino.shape);

    if (collided) break;

    y = player.position.y + i;
  }

  return { x: player.position.x, y: y };
}

export function playerController(
  action: TetrisAction,
  player: TetrisPlayer,
  gameGrid: TetrisGrid,
  setPlayerPosition: (position: Position) => void,
  setPlayerShape: (shape: TetrisShape) => void,
) {
  if (action === "RotateClockwise" || action === "RotateCounterClockwise") {
    attemptPlayerRotate(action, player, gameGrid, setPlayerShape);
  } else {
    attemptPlayerMove(action, player, gameGrid, setPlayerPosition);
  }
}
