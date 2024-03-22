import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import DrawerNavigator from "../navigators/DrawerNavigator";

export default function Contact() {
  return (
    <LinearGradient
      colors={["rgba(77, 0, 0, 0.8)", "rgba(0, 0, 0, 0.8)"]}
      style={styles.background}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Contact</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
});
