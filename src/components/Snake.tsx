import { StyleSheet, View } from "react-native";

export default function Snake({ snake }: any): JSX.Element {
  return (
    <>
      {snake.map((segment: any, index: number) => {
        const segmentStyle = {
          left: segment.x * 10, // adjust for the size of each segment
          top: segment.y * 10,
        };
        return <View key={index} style={[styles.snake, segmentStyle]} />;
      })}
    </>
  );
}
const styles = StyleSheet.create({
  snake: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: "lightgreen",
    position: "absolute",
  },
});
