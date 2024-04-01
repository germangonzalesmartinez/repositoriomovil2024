import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { LinearGradient } from "expo-linear-gradient";

export const Information = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      // Guardar la foto en la galería
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      alert("Foto tomada y guardada en la galería.");
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No se ha concedido permiso para acceder a la cámara.</Text>;
  }

  return (
    <LinearGradient
      colors={["rgba(77, 0, 0, 0.8)", "rgba(0, 0, 0, 0.8)"]}
      style={styles.background}
    >
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={Camera.Constants.Type.back}
          ref={(ref) => setCameraRef(ref)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                Tomar foto
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
  background: {
    flex: 1,
    width: "100%",
  },
});
