import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { GlobalStyles } from "../styles/globalStyles";

export default function Search({navigation}) {
  const gStyle = GlobalStyles();
  const theme = useTheme();
  return (
    <Searchbar
      placeholder="Search here"
      mode="bar"
      style={gStyle.search}
      theme={{ version: 3 }}
      elevation={1}
      inputStyle={{
        fontFamily: theme.fonts.regular,
        fontSize: 16,
        color: theme.colors.black,
      }}
      right={() => (
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.navigate("Filters")}
        >
          <View
            style={{
              borderRightWidth: 1,
              marginRight: 16,
              borderColor: theme.colors.border,
            }}
          />
          <FontAwesome5
            name="sliders-h"
            size={24}
            color={theme.colors.primary}
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
      )}
    />
  );
}
