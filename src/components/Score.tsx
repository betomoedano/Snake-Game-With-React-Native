import { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";

interface ScoreProps {
  isGameOver: boolean;
  score: number;
}

export default function Score({ isGameOver, score }: ScoreProps): JSX.Element {
  return (
    <View>
      {isGameOver ? (
        <Fragment>
          <Text style={styles.text}>Game Over 🏴‍☠️</Text>
          <Text style={styles.text}>Score: {score}</Text>
        </Fragment>
      ) : (
        <Text style={styles.text}>Score: {score}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "gray",
  },
});
