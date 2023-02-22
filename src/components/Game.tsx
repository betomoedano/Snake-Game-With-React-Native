import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Food from "./Food";
import Score from "./Score";
import Snake from "./Snake";

interface GestureEventType {
  nativeEvent: { translationX: number; translationY: number };
}

export interface Coordinate {
  x: number;
  y: number;
}

enum Direction {
  Right,
  Up,
  Left,
  Down,
}

export default function Game(): JSX.Element {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<Coordinate>({ x: 5, y: 20 });
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        moveSnake();
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver]);

  const moveSnake = () => {
    const snakeHead = snake[0];

    //check game over
    if (
      snakeHead.x < 1 ||
      snakeHead.x > 35 ||
      snakeHead.y < 1 ||
      snakeHead.y > 67
    ) {
      setIsGameOver(true);
    }

    let newHead = { ...snakeHead }; // create a new head object to avoid mutating the original head
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
    //check eats food
    if (newHead.x === food.x && newHead.y === food.y) {
      setSnake([newHead, ...snake]);
      setFood({
        x: Math.floor(Math.random() * 34),
        y: Math.floor(Math.random() * 67),
      });
      setScore(score + 10);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };
  const handleGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Right);
        console.log("right");
      } else {
        setDirection(Direction.Left);
        console.log("left");
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down);
        console.log("down");
      } else {
        setDirection(Direction.Up);
        console.log("up");
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Score isGameOver={isGameOver} score={score} />
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  boundaries: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 5,
  },
});
