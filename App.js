import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { MainNavigator } from "./src/navigators/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["rgba(77, 0, 0, 0.8)", "rgba(0, 0, 0, 0.8)"]}
        style={StyleSheet.absoluteFill}
      />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
