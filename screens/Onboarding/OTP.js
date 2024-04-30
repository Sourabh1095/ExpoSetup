import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { OtpInput } from "react-native-otp-entry";

import RootView from "../../components/util/RootView";
import HeaderComp from "../../components/util/HeaderComp";
import HeaderSub from "../../components/util/HeaderSub";
import { GlobalStyles } from "../../components/styles/globalStyles";
import { height } from "../../components/util/Dimensions";
import Button from "../../components/util/Button";
import Footer from "../../components/util/Footer";

export default function OTP({navigation}) {
  const gStyle = GlobalStyles();
  const theme = useTheme();

  //state
  const [OTP, setOTP]=useState(null)
  
  return (
    <RootView>
      <ScrollView style={{ flex: 1 }}>
        {/* header starts */}
        <HeaderComp title={"OTP"} style={gStyle.flexStyle}>
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
          subTitle={"We have sent the OTP to your email ID."}
        />
        <HeaderSub
          style={[gStyle.flexStyle, { marginLeft: 40 }]}
          subTitle={"abc@gmail.com"}
          childrens={
            <Feather
              name="edit"
              size={18}
              color={theme.colors.primary}
              style={{ marginLeft: 20 }}
            />
          }
        />
        {/* header ends */}

        {/* OTP input starts */}
        <OtpInput
          numberOfDigits={6}
          focusColor={theme.colors.black}
          focusStickBlinkingDuration={500}
          onTextChange={(text) => console.log(text)}
          onFilled={(text) => {console.log(`OTP is ${text}`); setOTP(text)}}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            containerStyle: styles.container,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            filledPinCodeContainerStyle:styles.filledPinCont,
          }}
        />
        {/* OTP input ends */}

        <Footer text={"Didn't reveive OTP? "} pressableText={'Resend Code'} style={{marginTop:height*0.05}} />
      </ScrollView>

      {/* footer */}
      <Button
        text={"Next"}
        style={{ marginBottom: height * 0.07 }}
        onPress={() => navigation.navigate("ResetPassword")}
      />
    </RootView>
  );
}

const styles = StyleSheet.create({
  pinCodeContainer: { height:50, width:50 },
  container:{ marginTop:height*0.2 },
  filledPinCont:{borderColor:'black'},
  pinCodeText:{fontFamily:'HBold', fontSize:28}
});
