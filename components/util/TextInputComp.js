import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

export default function TextInputComp({right, secureTextEntry, placeholder}) {
  const theme = useTheme();
  return (
    <TextInput
      mode={"outlined"}
      theme={{ roundness: 14 }}
      style={{ backgroundColor: theme.colors.white, fontSize:14, fontFamily:'HRegular'}}
      textColor={theme.colors.black}
      activeOutlineColor={theme.colors.black}
      right={right}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.placeholder}
    />
  );
}
