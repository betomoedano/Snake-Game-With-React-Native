import { FC, PropsWithChildren, forwardRef } from "react"
import Snake from "./Snake";
import { Coordinate } from "../types/types";
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from "react-native";
import Food from "./Food";

interface GameFieldProps extends PropsWithChildren {
  SnakeProps: Coordinate[],
  FoodProps: Coordinate,
  style: StyleProp<ViewStyle>,
  onLayout: (event: LayoutChangeEvent) => void
}
const GameField =forwardRef<View, GameFieldProps> ((props, ref) => {
  return (
    <View onLayout={e => props.onLayout(e)} style={props.style}>
      <Snake snake={props.SnakeProps} />
      <Food x={props.FoodProps.x} y={props.FoodProps.y} />
    </View>
  )
})

export default GameField;