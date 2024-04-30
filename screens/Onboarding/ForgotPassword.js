import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

import RootView from "../../components/util/RootView";
import HeaderComp from "../../components/util/HeaderComp";
import HeaderSub from "../../components/util/HeaderSub";
import { GlobalStyles } from "../../components/styles/globalStyles";
import Label from "../../components/util/Label";
import TextInputComp from "../../components/util/TextInputComp";
import { height } from "../../components/util/Dimensions";
import Button from "../../components/util/Button";
import { useTextInput } from "../../components/hooks/useTextInput";

export default function ForgotPassword({ navigation }) {
  const gStyle = GlobalStyles();

  //textInput
  const [email, setEmail, emailError] = useTextInput("", "email");

  return (
    <RootView>
      <ScrollView style={{ flex: 1 }}>
        {/* header starts */}
        <HeaderComp title={"Forgot Password"} style={gStyle.flexStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/back.png")}
              resizeMode="contain"
              style={gStyle.back}
            />
          </TouchableOpacity>
        </HeaderComp>
        <HeaderSub
          style={{ marginLeft: 40 }}
          subTitle={
            "Enter your Email / Number to generate OTP for resetting password."
          }
        />
        {/* header ends */}

        <View style={{ marginTop: height * 0.07 }}>
          <Label label={"Your Email ID"} />
          <TextInputComp placeholder={"abc@gmail.com"} value={email} onChangeText={setEmail} errorMessage={emailError} />
        </View>
      </ScrollView>

      {/* footer */}
      <Button
        text={"Next"}
        style={{ marginBottom: height * 0.07 }}
        disabled={!email || !!emailError}
        onPress={() => navigation.navigate("OTP")}
      />
    </RootView>
  );
}
