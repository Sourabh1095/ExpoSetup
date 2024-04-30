import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const generateStyles = (theme) =>
  StyleSheet.create({
    strike: {
      borderBottomWidth: 1,
      width: "40%",
      borderBottomColor: theme.colors.border,
    },
    mainView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
    },
});

export default function OrStrike({ style }) {
  const theme = useTheme();
  const styles = generateStyles(theme);
  return (
    <View style={[styles?.mainView, style]}>
      <View style={styles?.strike} />
      <Text
        style={{
          marginHorizontal: 20,
          color: theme.colors.orText,
          fontFamily: theme.fonts.regular,
          fontSize:16
        }}
      >
        Or
      </Text>
      <View style={styles?.strike} />
    </View>
  );
}
