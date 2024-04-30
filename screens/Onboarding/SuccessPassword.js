import { Text, View, Image } from "react-native";
import React from "react";

import RootView from "../../components/util/RootView";
import { GlobalStyles } from "../../components/styles/globalStyles";
import { height } from "../../components/util/Dimensions";
import Button from "../../components/util/Button";

export default function SuccessPassword() {
  const gStyle = GlobalStyles();
  return (
    <RootView>
      <View style={gStyle.centerView}>
        <Image
          source={require("../../assets/onboarding/success1.png")}
          style={{ width: "100%", height: height * 0.3 }}
          resizeMode="contain"
        />
        <Text style={[gStyle.marginTop, gStyle.headerSubText,{fontSize:24} ]}>Passowrd updated successfully!</Text>
      </View>
      <Button text={'Proceed'} style={{ marginBottom: height * 0.07 }} />
    </RootView>
  );
}
