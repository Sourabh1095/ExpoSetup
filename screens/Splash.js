import { StyleSheet, View, ImageBackground } from "react-native";
import React from "react";

import { width, height } from "../components/util/Dimensions";
import { GlobalStyles } from "../components/styles/globalStyles";
import SemiCircle from "../components/util/SemiCircle";
import RootView from "../components/util/RootView";

const ratio = width / height;

export default function Splash({ navigation }) {
  const gStyle = GlobalStyles();

  return (
    <RootView viewStyle={{paddingHorizontal:0}} >
      <SemiCircle />
      {/* bottom image starts */}
      <View style={styles.bottomImgView}>
        <ImageBackground
          source={require("../assets/splashScreen.png")}
          style={styles.bottomImg}
          resizeMode="contain"
        />
      </View>
      {/* bottom image ends */}
    </RootView>
  );
}

const styles = StyleSheet.create({
  bottomImgView: { justifyContent: "flex-end", flex: 0.85 },
  bottomImg: {
    // height: ratio < 0.75 ? height * 0.35 : height * 0.4,
    // width: ratio < 0.75 ? width * 0.7 : width * 0.45,
    height:300, width:300,
    alignSelf: "flex-end",
  },
});
