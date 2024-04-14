import { SnakeAction } from "@/snake";

const keyBinds: { [key: string]: SnakeAction } = {
  ArrowUp: "MoveUp",
  KeyW: "MoveUp",
  ArrowLeft: "MoveLeft",
  KeyA: "MoveLeft",
  ArrowRight: "MoveRight",
  KeyD: "MoveRight",
  ArrowDown: "MoveDown",
  KeyS: "MoveDown",
  Escape: "Quit",
  KeyP: "Pause",
};

export function getActionForKeyCode(code: string) {
  if (!Object.keys(keyBinds).includes(code)) return null;
  return keyBinds[code];
}
