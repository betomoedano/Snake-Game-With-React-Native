import { Coordinate } from "../types/types";

export const checkGameOver = (
  snakeHead: Coordinate,
  boundaries: { xMin: number, xMax: number, yMin: number, yMax: number}
): boolean => {
  return (
    snakeHead.x < boundaries.xMin ||
    snakeHead.x > boundaries.xMax ||
    snakeHead.y < boundaries.yMin ||
    snakeHead.y > boundaries.yMax
  );
};
