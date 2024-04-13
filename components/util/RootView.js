import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

import StatusBar from "./StatusBar";
import { GlobalStyles } from "../styles/globalStyles";

export default function RootView({ children, viewStyle }) {
  const gStyle = GlobalStyles();
  return (
    <>
      <StatusBar />
      <View style={[gStyle.container, viewStyle]}>{children}</View>
    </>
  );
}
