import {
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export const Information = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState("");

  const launchCameraAndTakePhoto = () => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setSelectedImage(response.assets[0].uri);
      } else {
        console.log("La captura de la imagen fue cancelada o hubo un error.");
      }
    });
  };

  return (
    <LinearGradient
      colors={["rgba(77, 0, 0, 0.8)", "rgba(0, 0, 0, 0.8)"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.imageContainer}>
            <Image
              source={selectedImage ? { uri: selectedImage } : null}
              style={styles.image}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={launchCameraAndTakePhoto}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Tomar foto
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 0,
  },
  image: {
    width: "100%",
    height: 400,
    bottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "orange",
    width: 140,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 15,
  },
});
