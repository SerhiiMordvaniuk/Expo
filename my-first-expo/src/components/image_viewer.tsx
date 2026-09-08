import { Image } from "expo-image";
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type Props = { imgSource: ImageSourcePropType };

export default function ImageViewer({ imgSource }: Props) {
  return (
    <View style={styles.imageContainer}>
      <Image source={imgSource} style={styles.image}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
