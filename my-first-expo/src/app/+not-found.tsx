import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundSCreen() {
  return (
    <View style={styles.container}>
      <Link href="/" style={styles.txt}>
        Go back to HOME
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow",
  },
  txt: {
    fontSize: 24,
    color: "black",
  },
});
