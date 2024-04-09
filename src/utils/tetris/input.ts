import { TetrisAction } from "@/tetris";

const keyBinds: { [key: string]: TetrisAction } = {
  ArrowLeft: "MoveLeft",
  KeyA: "MoveLeft",
  ArrowRight: "MoveRight",
  KeyD: "MoveRight",
  ArrowDown: "MoveDown",
  KeyS: "MoveDown",
  Space: "Drop",
  ArrowUp: "RotateClockwise",
  KeyE: "RotateClockwise",
  KeyQ: "RotateCounterClockwise",
  Escape: "Quit",
  KeyP: "Pause",
};

export function getActionForKeyCode(code: string) {
  if (!Object.keys(keyBinds).includes(code)) return null;
  return keyBinds[code];
}
