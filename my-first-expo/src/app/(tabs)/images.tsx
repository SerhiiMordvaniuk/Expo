import { StyleSheet, Text, View } from "react-native";

export default function ImagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Images screeen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: "red",
    fontSize: 40,
  },
});
