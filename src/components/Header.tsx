import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Score from "./Score";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/colors";

interface HeaderProps {
  reloadGame: () => void;
  children: JSX.Element;
}

export default function Header({
  children,
  reloadGame,
}: HeaderProps): JSX.Element {
  return (
    <View style={styles.container}>
      {children}
      <Pressable onPress={reloadGame}>
        <Ionicons name="reload-circle" size={30} color={Colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Colors.primary,
    borderWidth: 7,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomWidth: 0,
    padding: 15,
  },
});
