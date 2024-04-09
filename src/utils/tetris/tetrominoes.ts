import { TetrisShape, TetrisTetromino } from "@/tetris";

export const tetrominoes: TetrisTetromino[] = [
  {
    name: "I",
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  },
  {
    name: "J",
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
  },
  {
    name: "L",
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
  },
  {
    name: "O",
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    name: "S",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
  },
  {
    name: "T",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
  },
  {
    name: "Z",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
  },
];

export function getRandomTetromino() {
  return tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
}

export const getRotatedShape = (
  shape: TetrisShape,
  direction: number,
): TetrisShape => {
  // Transpose rows and columns
  const newShape = shape.map((_, i) => shape.map((col) => col[i]));

  // Reverse rows to get a rotated grid
  if (direction > 0) return newShape.map((row) => row.reverse());

  return newShape.reverse();
};
