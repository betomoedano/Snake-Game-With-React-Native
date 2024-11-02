import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import * as Updates from "expo-updates";
import { useEffect } from "react";

interface HeaderProps {
  reloadGame: () => void;
  pauseGame: () => void;
  children: JSX.Element;
  isPaused: boolean;
}

export default function Header({
  children,
  reloadGame,
  pauseGame,
  isPaused,
}: HeaderProps): JSX.Element {
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      // Update has successfully downloaded; apply it now
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  // If true, we show the button to download and run the update
  const showDownloadButton = isUpdateAvailable;

  // Show whether or not we are running embedded code or an update
  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? "This app is running from built-in code"
    : "This app is running an update";

  return (
    <View style={styles.container}>
      <Text
        style={{
          position: "absolute",
          bottom: 1,
          left: "35%",
          color: "gray",
          fontSize: 10,
        }}
      >
        {runTypeMessage}
      </Text>
      <TouchableOpacity onPress={reloadGame}>
        <Ionicons name="reload-circle" size={35} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={Updates.checkForUpdateAsync}>
        <FontAwesome name={"refresh"} size={35} color={Colors.primary} />
      </TouchableOpacity>

      {showDownloadButton ? (
        <TouchableOpacity onPress={Updates.fetchUpdateAsync}>
          <FontAwesome name={"check"} size={35} color={Colors.primary} />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity onPress={pauseGame}>
        <FontAwesome
          name={isPaused ? "play-circle" : "pause-circle"}
          size={35}
          color={Colors.primary}
        />
      </TouchableOpacity>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Colors.primary,
    borderWidth: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    padding: 15,
    backgroundColor: Colors.background,
  },
});
