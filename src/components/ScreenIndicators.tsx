import React from "react";
import { View, StyleSheet } from "react-native";

export const ScreenIndicators = ({
  count,
  activeIndex,
}: {
  count: number;
  activeIndex: number;
}) => {
  return (
    <View style={styles.container}>
      {new Array(count).fill("").map((_, index) => (
        <View
          style={[
            styles.indicator,
            index === activeIndex ? styles.activeIndicator : null,
          ]}
          key={index}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "white",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "orange",
  },
});
