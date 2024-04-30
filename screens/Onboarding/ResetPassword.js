import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";

import RootView from "../../components/util/RootView";
import HeaderComp from "../../components/util/HeaderComp";
import HeaderSub from "../../components/util/HeaderSub";
import { GlobalStyles } from "../../components/styles/globalStyles";
import { height } from "../../components/util/Dimensions";
import Button from "../../components/util/Button";
import Label from "../../components/util/Label";
import TextInputComp from "../../components/util/TextInputComp";
import { useTextInput } from "../../components/hooks/useTextInput";

export default function ResetPassword({ navigation }) {
  const gStyle = GlobalStyles();

  //state
  const [showPassword, setShowPassword] = useState(false);

  //textInput
  const [password, setPassword, passwordError] = useTextInput("", "password");
  const [newPassword, setNewPassword, newPasswordError] = useTextInput(
    "",
    "password"
  );

  return (
    <RootView>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* header starts */}
        <HeaderComp title={"Reset Password"} style={gStyle.flexStyle}>
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
          subTitle={"Enter your new password below."}
        />
        {/* header ends */}

        {/* Password view starts */}
        <View>
          <View style={{ marginTop: height * 0.1 }}>
            <Label label={"New Password"} />
            <TextInputComp
              placeholder={"min. 8 characters"}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              errorMessage={passwordError}
            />
          </View>

          <View style={gStyle.marginTop}>
            <Label label={"Confirm New Password"} />
            <TextInputComp
              placeholder={"min. 8 characters"}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showPassword}
              errorMessage={(newPassword?.length!=0)?((newPassword==password)?"":"Password does not match"):""}
            />
          </View>
        </View>
        {/* Passowrd view ends */}
      </ScrollView>

      {/* footer */}
      <Button
        text={"Next"}
        style={{ marginBottom: height * 0.04 }}
        disabled={!password || !!passwordError || !newPassword ||  password != newPassword}
        onPress={() => navigation.navigate("SuccessPassword")}
      />
    </RootView>
  );
}

const styles = StyleSheet.create({});
