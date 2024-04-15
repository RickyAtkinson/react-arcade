import { COLUMNS, ROWS } from "@/data/snake";
import { Position } from "@/index";

export function checkCollision(desiredPosition: Position, snake: Position[]) {
  // Check wall collision
  if (
    desiredPosition.x >= COLUMNS ||
    desiredPosition.x < 0 ||
    desiredPosition.y >= ROWS ||
    desiredPosition.y < 0
  )
    return true;

  // Check collision with snake
  for (const segment of snake) {
    if (desiredPosition.x === segment.x && desiredPosition.y === segment.y)
      return true;
  }

  return false;
}
