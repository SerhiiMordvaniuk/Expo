import { Text, View, StyleSheet, ImageSourcePropType } from "react-native";
import ImageViewer from "@/components/image_viewer";
import Button from "@/components/button";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import CircleButton from "@/components/circle-button";
import IconButton from "@/components/icon_button";
import EmojiPicker from "@/components/emoji-picker";
import EmojiList from "@/components/emoji_list";
import EmojiSticker from "@/components/emoji-sticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";
import { Asset } from "expo-media-library";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );

  const [showAppOption, setShowAppOption] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<
    ImageSourcePropType | undefined
  >(undefined);

  const [permissionResponse, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const imageRef = useRef<View>(null);

  const onReset = () => {
    setShowAppOption(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });
      await Asset.create(localUri);
      if (localUri) {
        alert("Saved");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOption(true);
    } else {
      alert("You did not select any image.");
    }
  };

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            imgSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>
      {showAppOption ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton
              label="reset"
              onPress={onReset}
              icon="refresh"
            ></IconButton>
            <CircleButton onPress={onAddSticker} />
            <IconButton
              label="Save"
              onPress={onSaveImageAsync}
              icon="save-alt"
            ></IconButton>
          </View>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          ></Button>
          <Button
            label="Use this photo"
            onPress={() => setShowAppOption(true)}
          ></Button>
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onCloseModal={onModalClose} onSelect={setPickedEmoji} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 50,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25292e",
  },
  imageContainer: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
