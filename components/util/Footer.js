import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

export default function Footer() {
  const theme = useTheme();
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontFamily: theme.fonts.regular, fontSize: 18 }}>
        Don't have an account?{" "}
        <Text
          style={{
            color: theme.colors.primary,
            textDecorationLine: "underline",
          }}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}