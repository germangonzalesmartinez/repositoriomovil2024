import React from "react";
import { Text, StyleSheet, SafeAreaView, View, Image } from "react-native";
import { RootStackScreenProps } from "../navigators/MainNavigator";
import { INTRO_SCREEN_02 } from "../utils/constants";
import { LESTERNERS } from "../utils/constants";
import { ScreenIndicators } from "../components/ScreenIndicators";
import PrimaryButton from "../components/PrimaryButton";
import { LinearGradient } from "expo-linear-gradient";
import SkipButton from "../components/SkipButton";

export const Onboarding2 = ({
  navigation,
}: RootStackScreenProps<"Onboarding2">) => {
  return (
    <LinearGradient
      colors={["rgba(77, 0, 0, 0.8)", "rgba(0, 0, 0, 0.8)"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/onboarding2.png")} // ajusta la ruta de la imagen según sea necesario
              style={styles.image}
            />
          </View>
          <View>
            <Text style={styles.title}>{INTRO_SCREEN_02.title}</Text>
            <Text style={styles.description}>
              {INTRO_SCREEN_02.description}
            </Text>
          </View>
          <ScreenIndicators count={3} activeIndex={1} />
          <View>
            <Text style={styles.titleLesteners}>{LESTERNERS.title}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <SkipButton
              label="Skip"
              onPress={() => navigation.replace("TabNavigator")}
            />
            <PrimaryButton
              label="Next"
              onPress={() => navigation.replace("Onboarding3")}
            />
          </View>
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 0,
  },
  image: {
    width: 300,
    height: 300,
    bottom: 10,
  },
  title: {
    color: "orange",
    fontSize: 40,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  description: {
    color: "white",
    fontSize: 13,
    marginHorizontal: 100,
    marginBottom: 40,
    textAlign: "center",
  },
  titleLesteners: {
    color: "white",
    fontSize: 15,
    marginBottom: 50,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
});
