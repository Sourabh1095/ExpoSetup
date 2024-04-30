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
import { useDispatch } from "react-redux";

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
import { loggedState } from "../../redux/slices/isLogged";
import { useTextInput } from "../../components/hooks/useTextInput";

export default function Login({ navigation }) {
  const gStyle = GlobalStyles();
  const theme = useTheme();
  const styles = generateStyles(theme);
  const dispatch = useDispatch();

  //state
  const [showPassword, setShowPassword] = useState(false);

  //text inputs
  const [email, setEmail, emailError] = useTextInput("", "email");
  const [password, setPassword, passwordError] = useTextInput("", "password");

  return (
    <RootView>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <HeaderComp title={"Login"} />
        <HeaderSub
          subTitle={"Time to cue your entrance - login as your cinematic self!"}
        />

        {/* Onboarding textinputs starts */}
        <View style={gStyle.marginTop}>
          <Label label={"Your Email ID"} />
          <TextInputComp
            placeholder={"abc@gmail.com"}
            value={email}
            onChangeText={setEmail}
            errorMessage={emailError}
          />
        </View>

        <View style={gStyle.marginTop}>
          <Label label={"Enter Password"} />
          <TextInputComp
            right={
              <TextInput.Icon
                icon={showPassword ? "eye" : "eye-off"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder={"min. 8 characters"}
            errorMessage={passwordError}
          />
        </View>
        {/* Onboarding textinputs ends */}

        <TouchableOpacity
          style={styles.forgotView}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text
            style={[styles.forgotPassText, { color: theme.colors.primary }]}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <Button
          text={"Continue"}
          style={{ marginTop: height * 0.03 }}
          disabled={!!emailError || !!passwordError || !email || !password}
          onPress={() => dispatch(loggedState(true))}
        />

        <OrStrike style={{ marginVertical: height * 0.05 }} />

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
      <Footer
        text={"Don't have an account? "}
        pressableText={"Sign Up"}
        onPress={() => navigation.navigate("SignUpAs")}
      />
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
