import { Coordinate } from "../types/types";

export const checkEatSelf = (newHead: Coordinate, snakeHead: Coordinate[]): boolean => {
    return snakeHead.find(x => x.x == newHead.x && x.y == newHead.y) != undefined;
}