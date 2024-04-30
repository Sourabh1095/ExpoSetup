import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { GlobalStyles } from "../styles/globalStyles";

export default function HeaderComp({ children, title, style, textStyle }) {
  const gStyle = GlobalStyles();
  return (
    <View style={[gStyle.headerView, style]}>
      {children}
      <Text style={[gStyle.headerText, textStyle]}>{title}</Text>
    </View>
  );
}
