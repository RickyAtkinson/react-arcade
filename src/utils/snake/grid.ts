import { Position, SetStateFunction } from "@/index";
import { COLUMNS, POINTS_PER_APPLE, ROWS } from "@/data/snake";
import { getRandomGridCell } from "../grid";

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

export function checkAppleCollision(
  snake: Position[],
  desiredPosition: Position,
  currentApple: Position,
  setApple: SetStateFunction<Position>,
  setGameScore: SetStateFunction<number>,
) {
  if (
    desiredPosition.x === currentApple.x &&
    desiredPosition.y === currentApple.y
  ) {
    setGameScore((prev) => prev + POINTS_PER_APPLE);

    let newApplePos = getRandomGridCell(ROWS, COLUMNS);
    while (checkCollision(newApplePos, snake)) {
      newApplePos = getRandomGridCell(ROWS, COLUMNS);
    }

    setApple(newApplePos);
    return true;
  }
  return false;
}
