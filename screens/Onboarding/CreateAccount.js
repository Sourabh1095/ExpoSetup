import { StyleSheet, Platform, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";

import Button from "../../components/util/Button";
import { height, width } from "../../components/util/Dimensions";
import HeaderComp from "../../components/util/HeaderComp";
import HeaderSub from "../../components/util/HeaderSub";
import { GlobalStyles } from "../../components/styles/globalStyles";
import DP from "../../components/util/DP";
import Label from "../../components/util/Label";
import TextInputComp from "../../components/util/TextInputComp";
import KeyboardAvoidingCont from "../../components/util/KeyboardAvoidingCont";
import DropdownComp from "../../components/util/DropdownComp";
import { useTextInput } from "../../components/hooks/useTextInput";

const data = [
  { id: 1, value: "Male" },
  { id: 2, value: "Female" },
];

const data1 = [
  { id: 1, value: "Mumbai" },
  { id: 2, value: "Pune" },
];

const data2 = [
  { id: 1, value: "Production Manager/Controller" },
  { id: 2, value: "Line Producer" },
  { id: 3, value: "Executive Producer/Producer" },
  { id: 4, value: "Others" },
];

export default function CreateAccount({ navigation }) {
  const gStyle = GlobalStyles();
  const theme = useTheme();

  // States
  const [dp, setDp] = useState("");
  const [drpValue, setDrpValue] = useState(null);
  const [drpValue1, setDrpValue1] = useState(null);
  const [focus, setIsFocus] = useState(false);
  const [focus1, setIsFocus1] = useState(false);

  //text inputs
  const [name, setName, nameError] = useTextInput("", "name");
  const [mob, setMob, mobError] = useTextInput("", "phone");
  const [email, setEmail, emailError] = useTextInput("", "email");

  return (
    <KeyboardAvoidingCont>
      <ScrollView
        style={{ paddingHorizontal: Platform.OS == "ios" ? 16 : 0 }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderComp title={"Create Account"} />
        <HeaderSub
          subTitle={
            "Ready, set, action! Create your account and let the magic begin."
          }
        />

        {/* DP starts */}
        <DP dp={dp} setDp={setDp} />
        {/* DP ends */}

        {/* user info starts */}
        <View>
          <View style={gStyle.marginTop}>
            <Label label={"Full Name*"} />
            <TextInputComp
              placeholder={"Eg: Rajat Gupta"}
              style={{ textTransform: "uppercase" }}
              value={name}
              onChangeText={setName}
              errorMessage={nameError}
            />
          </View>

          <View style={gStyle.marginTop}>
            <Label label={"Phone Number*"} />
            <TextInputComp
              placeholder={"Eg: +91 9999999999"}
              value={mob}
              onChangeText={setMob}
              errorMessage={mobError}
            />
          </View>

          <View style={gStyle.marginTop}>
            <Label label={"Email ID*"} />
            <TextInputComp
              placeholder={"Eg: abc@gmail.com"}
              value={email}
              onChangeText={setEmail}
              errorMessage={emailError}
            />
          </View>

          <View style={[gStyle.marginTop, gStyle.flexBetween]}>
            <View>
              <Label label={"Gender*"} />
              <DropdownComp
                data={data}
                drpWidth={width * 0.35}
                drpValue={drpValue}
                setDrpValue={setDrpValue}
                labelField="value"
                valueField="id"
                rightIcon={true}
                borderWidth={drpValue == null ? 0.5 : 1}
                focus={focus}
                setIsFocus={setIsFocus}
              />
            </View>
            <View>
              <Label label={"City"} />
              <DropdownComp
                data={data1}
                labelField="value"
                valueField="id"
                disable={true}
                drpWidth={width * 0.5}
                drpValue={data1[0]}
                backgroundColor={theme.colors.grey}
                rightIcon={false}
              />
            </View>
          </View>

          <View style={[gStyle.marginTop, { marginBottom: height * 0.1 }]}>
            <Label label={"Bio (Optional)"} />
            <DropdownComp
              data={data2}
              drpValue={drpValue1}
              setDrpValue={setDrpValue1}
              labelField="value"
              valueField="id"
              dropdownPosition={"top"}
              rightIcon={true}
              borderWidth={drpValue1 == null ? 0.5 : 1}
              focus={focus1}
              setIsFocus={setIsFocus1}
            />
            {drpValue1?.value == "Others" && (
              <TextInputComp
                placeholder={"Type"}
                style={{ marginTop: height * 0.02 }}
              />
            )}
          </View>
        </View>
        {/* user info ends */}

        {/* footer */}
        <Button
          text={"Continue"}
          style={{
            marginBottom: height * 0.05,
            marginHorizontal: Platform.OS == "ios" ? 16 : 0,
          }}
          disabled={
            !!nameError || !!mobError || !!emailError || !name || !mob || !email || drpValue==null
          }
          onPress={() => navigation.navigate("Success")}
        />
      </ScrollView>
    </KeyboardAvoidingCont>
  );
}
