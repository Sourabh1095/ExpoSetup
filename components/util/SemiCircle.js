import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Circle } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

import { height, width } from "./Dimensions";

const ratio = width / height;

export default function SemiCircle({ style }) {
  const theme = useTheme();
  return (
    <View style={[style, { flex: 1 }]}>
      <Svg style={styles.svg}>
        <Circle
          cx="75%"
          cy={ratio < 0.75 ? "45%" : "30%"}
          r="20%"
          fill={theme.colors.splashSecCir}
        />
        <Circle
          cx="20%"
          cy={ratio < 0.75 ? "65%" : "55%"}
          r="30%"
          fill={theme.colors.splashCirc}
        />
      </Svg>
      <Text style={styles.title}>
        zoo<Text style={{ color: theme.colors.text }}>keeper</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginTop: ratio < 0.75 ? -height * 0.20 : -height * 0.25,
    fontSize: 56
  },
  svg:{}
});
