import { FC, PropsWithChildren } from "react"
import Snake from "./Snake";
import { Coordinate } from "../types/types";
import { StyleProp, View, ViewStyle } from "react-native";
import Food from "./Food";

interface GameFieldProps extends PropsWithChildren {
  SnakeProps: Coordinate[];
  FoodProps: Coordinate,
  style: StyleProp<ViewStyle>
}
const GameField: FC<GameFieldProps> = (props) => {
    return (
      <View style={props.style}>
        <Snake snake={props.SnakeProps} />
        <Food x={props.FoodProps.x} y={props.FoodProps.y} />
      </View>
    )
}

export default GameField;