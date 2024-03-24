import React, { FC, PropsWithChildren } from "react";
import { Button, GestureResponderEvent, View } from "react-native";

const styles = {
  row: { flexDirection: "row" },
  col: { flex: 1 }
} as const;

interface ControlsProps {
    onUpPress:    (e: GestureResponderEvent) => void
    onDownPress:  (e: GestureResponderEvent) => void;
    onLeftPress:  (e: GestureResponderEvent) => void;
    onRightPress: (e: GestureResponderEvent) => void;
}

const Row: FC<PropsWithChildren> = (props) => {
  return (<View style={ styles.row }>{ props.children }</View>)
}
const Column: FC<PropsWithChildren> = (props) => {
  return (<View style={ styles.col }>{ props.children }</View>)
}

const Controls: FC<ControlsProps> = (props) => {
    return (
      <View>
        <Row>
          <Column />
          <Column><Button title="up" onPress={ props.onUpPress }></Button></Column>
          <Column />
        </Row>
        <Row>
          <Column><Button title="left" onPress={ props.onLeftPress }></Button></Column>
          <Column />
          <Column><Button title="right" onPress={ props.onRightPress }></Button></Column>
        </Row>
        <Row>
          <Column />
          <Column><Button title="down" onPress={ props.onDownPress }></Button></Column>
          <Column />
        </Row>
      </View>        
    );
}
export default Controls;