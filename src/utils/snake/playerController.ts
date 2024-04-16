import { Position, SetStateFunction } from "@/index";
import { Direction, SnakeAction } from "@/snake";

export function playerController(
  action: SnakeAction,
  snake: Position[],
  setDirection: SetStateFunction<Direction>,
) {
  let desiredDirection: Direction = { x: 0, y: -1 };

  if (action === "MoveUp") desiredDirection = { x: 0, y: -1 };
  else if (action === "MoveDown") desiredDirection = { x: 0, y: 1 };
  else if (action === "MoveLeft") desiredDirection = { x: -1, y: 0 };
  else if (action === "MoveRight") desiredDirection = { x: 1, y: 0 };
  else return;

  if (
    snake[0].x + desiredDirection.x === snake[1].x &&
    snake[0].y + desiredDirection.y === snake[1].y
  )
    return;

  setDirection(desiredDirection);
}
