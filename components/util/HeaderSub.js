import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { GlobalStyles } from "../styles/globalStyles";

export default function HeaderSub({ children, subTitle }) {
  const gStyle = GlobalStyles();
  return (
    <View>
      {children}
      <Text style={gStyle.headerSubText}>{subTitle}</Text>
    </View>
  );
}
