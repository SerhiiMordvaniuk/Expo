import { Image } from "expo-image";
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
  return (
    <View style={styles.imageContainer}>
      <Image source={imageSource} style={styles.image}></Image>
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
