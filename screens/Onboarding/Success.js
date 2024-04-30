import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

import RootView from "../../components/util/RootView";
import { height, width } from "../../components/util/Dimensions";
import { GlobalStyles } from "../../components/styles/globalStyles";
import Button from '../../components/util/Button'

export default function Success() {
  const gStyle = GlobalStyles();
  const theme = useTheme();
  return (
    <RootView>
      <View style={gStyle.centerView}>
        <Text style={gStyle.headerText}>Awesome</Text>
        <Text style={[gStyle.headerSubText, {textAlign:'center'}]}>Welcome to the spotlight! Let the location{`\n`} scouting adventures begin!</Text>
        <Image source={require('../../assets/onboarding/success.png')} style={{width:'100%', height:height*0.3}} resizeMode="contain" />
        <Text style={[gStyle.headerSubText, {fontSize:16, textAlign:'center', marginTop:height*0.1}]} >You can now login using your E-mail Id and Password{`\n`} to enjoy the luxuries of zoo<Text style={{color:theme.colors.primary}}>keeper</Text> world.</Text>
        <Button text={'Continue'} style={{width:width*0.92, marginTop:height*0.04}} />
      </View>
    </RootView>
  );
}
