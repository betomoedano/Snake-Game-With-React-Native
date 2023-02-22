import { StyleSheet, View } from "react-native";
import { Coordinate } from "./Game";

export default function Food({ x, y }: Coordinate): JSX.Element {
  return <View style={[{ top: y * 10, left: x * 10 }, styles.food]} />;
}

const styles = StyleSheet.create({
  food: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: "orange",
    position: "absolute",
  },
});
