import { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";
interface ScoreProps {
  score: number;
}

export default function Score({ score }: ScoreProps): JSX.Element {
  return (
    <View>
      <Text style={styles.text}>🍎 {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
  },
});
