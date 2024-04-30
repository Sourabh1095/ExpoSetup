import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GlobalStyles } from "../styles/globalStyles";

export default function KeyboardAvoidingCont({ children }) {
  const gStyle = GlobalStyles();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[gStyle.container, { marginTop: insets.top }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
