import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { height } from "./Dimensions";

export default function DP({ dp, setDp }) {
  const theme = useTheme();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setDp(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {dp.length == 0 ? (
        <TouchableOpacity style={styles.image} onPress={pickImage}>
          <Image source={require('../../assets/onboarding/person.png')} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <Image source={{ uri: dp }} style={styles.image} resizeMode="cover" />
      )}
      <Feather
        name="edit"
        size={24}
        color={theme.colors.primary}
        style={{ alignSelf: "flex-end" }}
        onPress={pickImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  image: { height: 90, width: 90, borderRadius: 90, backgroundColor:'red' },
});
