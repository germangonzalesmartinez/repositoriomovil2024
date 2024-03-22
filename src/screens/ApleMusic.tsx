import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BootomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ApplePay from "../components/AplePay";

export default function ApleMusic({ navigation }) {
  const sheetRef = useRef<BootomSheet>(null);
  const [isOpen, setIsOpen] = useState(true);

  const snapPoints = ["40%"];

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const handleNavigate = () => {
    navigation.navigate("TabNavigator"); // Navega a la otra pantalla
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <LinearGradient
          colors={["rgba(77, 0, 0, 0.8)", "rgba(0, 0, 0, 0.8)"]}
          style={styles.background}
        >
          <Text style={styles.subtitle}>
            {new Date().toString().slice(0, 11)}
          </Text>
          <Text style={styles.title}>Hoy</Text>
          <View style={styles.shadow}>
            <Image
              style={[styles.image, { opacity: isOpen ? 0.2 : 1 }]}
              source={{
                uri: "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2015/03/escuchar-musica.jpg?w=1000&quality=55&strip=all&ssl=1",
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSnapPress(0)}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              GET
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNavigate}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Volver
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        {/* BottomSheet */}
        <BootomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}
        >
          <BottomSheetView>
            <ApplePay />
          </BottomSheetView>
        </BootomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  background: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 22,
    textAlign: "left",
    margin: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "left",
    marginLeft: 10,
    color: "#fff",
    fontWeight: "500",
  },
  image: {
    width: "90%",
    height: 400,
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 20,
  },
  shadow: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 6.84,
    elevation: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "orange",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 15,
  },
});
