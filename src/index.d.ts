export type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export type ButtonColor = "gray" | "red" | "green" | "blue" | "yellow";

export type Grid<T> = T[][];

export type Vec2<T> = { x: T; y: T };

export type Position = Vec2<number>;
