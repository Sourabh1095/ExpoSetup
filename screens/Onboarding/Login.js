import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { TextInput } from "react-native-paper";

import { GlobalStyles } from "../../components/styles/globalStyles";
import RootView from "../../components/util/RootView";
import HeaderComp from "../../components/util/HeaderComp";
import HeaderSub from "../../components/util/HeaderSub";
import Label from "../../components/util/Label";
import { width, height } from "../../components/util/Dimensions";
import TextInputComp from "../../components/util/TextInputComp";
import Button from "../../components/util/Button";
import OrStrike from "../../components/util/OrStrike";
import Footer from "../../components/util/Footer";

export default function Login() {
  const gStyle = GlobalStyles();
  const theme = useTheme();
  const styles = generateStyles(theme);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <RootView>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <HeaderComp title={"Login"} />
        <HeaderSub
          subTitle={"Time to cue your entrance - login as your cinematic self!"}
        />

        {/* Onboarding textinputs starts */}
        <View style={{ marginTop: height * 0.03 }}>
          <Label label={"Your Phone Number/Email ID"} />
          <TextInputComp placeholder={"+91 99999 99999/abc@gmail.com"} />
        </View>

        <View style={{ marginTop: height * 0.03 }}>
          <Label label={"Enter Password"} />
          <TextInputComp
            right={
              <TextInput.Icon
                icon={showPassword ? "eye" : "eye-off"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            secureTextEntry={!showPassword}
            placeholder={"min. 8 characters"}
          />
        </View>
        {/* Onboarding textinputs ends */}

        <TouchableOpacity style={styles.forgotView}>
          <Text
            style={[styles.forgotPassText, { color: theme.colors.primary }]}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <Button text={"Continue"} style={{ marginTop: height * 0.03 }} />

        <OrStrike style={{ marginVertical: height * 0.03 }} />

        {/* Socials starts */}
        <Button
          text={"Sign In with Google"}
          style={[gStyle.flexStyle, styles.socialMain]}
          texStyle={styles.socialText}
        >
          <Image
            source={require("../../assets/socials/google.png")}
            style={styles.socialLogo}
            resizeMode="contain"
          />
        </Button>

        <Button
          text={"Sign In with Facebook"}
          style={[
            gStyle.flexStyle,
            styles.socialMain,
            { marginTop: height * 0.03 },
          ]}
          texStyle={styles.socialText}
        >
          <Image
            source={require("../../assets/socials/fb.png")}
            style={styles.socialLogo}
            resizeMode="contain"
          />
        </Button>
        {/* Social ends */}
      </ScrollView>

      {/* footer starts */}
      <Footer />
      {/* footer ends */}
    </RootView>
  );
}

const generateStyles = (theme) =>
  StyleSheet.create({
    forgotPassText: {
      fontFamily: "HRegular",
      fontSize: 14,
    },
    socialText: {
      marginTop: 2,
      fontSize: 18,
      fontFamily: theme.fonts.regular,
      color: theme.colors.black,
    },
    socialMain: {
      justifyContent: "center",
      backgroundColor: theme.colors.secondary,
    },
    socialLogo: { width: 16, height: 16, marginRight: 10 },
    forgotView: { marginTop: height * 0.015, alignSelf: "flex-end" },
  });
