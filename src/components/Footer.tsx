import { FC, PropsWithChildren } from "react";
import { View } from "react-native";
import { Colors } from "../styles/colors";

const Footer: FC<PropsWithChildren> = (props) => {
    return (<View style={styles.container}>{props.children}</View>)
}

const styles = {  
  container: { 
    flex: 2,
    borderColor: Colors.primary,
    borderWidth: 12,
    backgroundColor: Colors.background,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopWidth: 0,
    padding: 15
  },
  
};

export default Footer;