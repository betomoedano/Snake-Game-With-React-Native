import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Colors } from "../styles/colors";
import { Direction, Coordinate } from "../types/types";
import { checkEatsFood } from "../utils/checkEatsFood";
import { checkGameOver } from "../utils/checkGameOver";
import { checkEatSelf } from "../utils/checkEatSelf";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Header from "./Header";
import Footer from "./Footer";
import Score from "./Score";
import Controls from "./Controls";
import GameField from "./GameField";
import { SafeAreaView, StyleSheet } from "react-native";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 4, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

const Game: FC<PropsWithChildren> = () => {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead }; // create a new head object to avoid mutating the original head
    
    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    // GAME OVER
    if (checkGameOver(snakeHead, GAME_BOUNDS) || (snake.length > 1 && checkEatSelf(newHead, snake))) {
      setIsGameOver((prev) => !prev);
      return;
    }
    
    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setIsPaused(false);
  };

  const pauseGame = () => {
    setIsPaused(!isPaused);
  };

  return (
      <SafeAreaView style={styles.container}>
        <Header
          reloadGame={reloadGame}
          pauseGame={pauseGame}
          isPaused={isPaused}>
          <Score score={score} />
        </Header>
        <GameField SnakeProps={snake} FoodProps={food} style={styles.boundaries}/>
        <Footer>
          <Controls 
            onDownPress={ () => setDirection(Direction.Down) } 
            onUpPress={ () => setDirection(Direction.Up) }
            onLeftPress={ () => setDirection(Direction.Left) }
            onRightPress={ () => setDirection(Direction.Right) }>
          </Controls>
        </Footer>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 10,
    borderColor: Colors.primary,
    borderWidth: 12,
    backgroundColor: Colors.background
  },
});


export default Game;