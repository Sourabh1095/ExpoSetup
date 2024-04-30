import React from "react";
import { TextInput, HelperText, View } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

export default function TextInputComp({
  right,
  secureTextEntry,
  placeholder,
  style,
  value,
  onChangeText,
  errorMessage,
}) {
  const theme = useTheme();
  return (
    <>
      <TextInput
        mode={"outlined"}
        theme={{ roundness: 14, fonts: "HRegular" }}
        value={value}
        onChangeText={onChangeText}
        outlineStyle={{ borderColor: theme.colors.border }}
        style={[
          {
            backgroundColor: theme.colors.white,
            fontSize: 14,
            fontFamily: "HRegular",
          },
          style,
        ]}
        textColor={theme.colors.black}
        activeOutlineColor={theme.colors.black}
        right={right}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
      />
      {errorMessage?.length != 0 && value?.length!=0 && (
        <HelperText type="error" padding="none" style={{color:theme.colors.error, fontFamily:theme.fonts.regular, fontSize:14}} >*{errorMessage}</HelperText>
      )}
    </>
  );
}
