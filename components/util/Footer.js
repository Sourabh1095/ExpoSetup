import { Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

export default function Footer({text, pressableText, onPress, style}) {
  const theme = useTheme();
  return (
    <View style={[{ alignItems: "center" }, style]}>
      <Text style={{ fontFamily: theme.fonts.regular, fontSize: 18 }}>
        {text}
        <Text
          style={{
            color: theme.colors.primary,
            textDecorationLine: "underline",
          }}
          onPress={onPress}
        >
          {pressableText}
        </Text>
      </Text>
    </View>
  );
}