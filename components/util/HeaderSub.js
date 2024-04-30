import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { GlobalStyles } from "../styles/globalStyles";

export default function HeaderSub({ children, subTitle, style, childrens }) {
  const gStyle = GlobalStyles();
  return (
    <View style={style}>
      {children}
      <Text style={gStyle.headerSubText}>{subTitle}</Text>
      {childrens}
    </View>
  );
}
