import { Text, View } from "react-native";
import React from "react";

import { GlobalStyles } from "../styles/globalStyles";

export default function Label({ label }) {
  const gStyle = GlobalStyles();
  return (
    <View>
      <Text style={gStyle.headerSubText}>{label}</Text>
    </View>
  );
}
