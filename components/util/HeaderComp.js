import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { GlobalStyles } from "../styles/globalStyles";

export default function HeaderComp({ children, title }) {
  const gStyle = GlobalStyles();
  return (
    <View style={gStyle.headerView}>
      {children}
      <Text style={gStyle.headerText}>{title}</Text>
    </View>
  );
}
