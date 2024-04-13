import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

import { GlobalStyles } from "../styles/globalStyles";

export default function Button({ text, style, children, texStyle }) {
  const theme = useTheme();
  const gStyle = GlobalStyles();
  return (
    <TouchableOpacity style={[gStyle.buttonView, style]}>
        {children}
      <Text style={[gStyle.buttonText, texStyle, {width:'50%', textAlign:'center'}]}>{text}</Text>
    </TouchableOpacity>
  );
}
