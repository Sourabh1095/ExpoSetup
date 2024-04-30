import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

import { GlobalStyles } from "../styles/globalStyles";

export default function Button({
  text,
  style,
  children,
  texStyle,
  onPress,
  disabled,
}) {
  const gStyle = GlobalStyles();
  return (
    <TouchableOpacity
      style={[gStyle.buttonView, style, disabled == true && { opacity: 0.5 }]}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
      <Text
        style={[
          gStyle.buttonText,
          texStyle,
          { width: "50%", textAlign: "center" },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
