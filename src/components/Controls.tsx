import React, { FC, PropsWithChildren, useEffect } from "react";
import { Button, GestureResponderEvent, View } from "react-native";
import { Platform } from "react-native";

const styles = {
  row: { flexDirection: "row" },
  col: { flex: 1 }
} as const;

interface ControlsProps {
    onUpPress:    (e: GestureResponderEvent | undefined) => void
    onDownPress:  (e: GestureResponderEvent | undefined) => void;
    onLeftPress:  (e: GestureResponderEvent | undefined) => void;
    onRightPress: (e: GestureResponderEvent | undefined) => void;
}

const Row: FC<PropsWithChildren> = (props) => {
  return (<View style={ styles.row }>{ props.children }</View>)
}
const Column: FC<PropsWithChildren> = (props) => {
  return (<View style={ styles.col }>{ props.children }</View>)
}

const Controls: FC<ControlsProps> = (props) => {
    
  useEffect(() => {
    if(Platform.OS === 'web') {
      window.addEventListener("keydown", (e) => { 
        switch (e.key) {
          case "ArrowUp":
          case "w":
            props.onUpPress(undefined);
            break;
          case "ArrowDown":
          case "s":
            props.onDownPress(undefined);
            break;
          case "ArrowLeft":
          case "a":
            props.onLeftPress(undefined);
            break;
          case "ArrowRight":
          case "d":
            props.onRightPress(undefined);
            break;
        }
      })
    }
  });
  
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

function async(): React.EffectCallback {
  throw new Error("Function not implemented.");
}
