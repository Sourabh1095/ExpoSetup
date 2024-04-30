import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";

import RootView from "../../components/util/RootView";
import HeaderComp from "../../components/util/HeaderComp";
import { GlobalStyles } from "../../components/styles/globalStyles";
import { height } from "../../components/util/Dimensions";
import Button from "../../components/util/Button";

const data = [
  {
    id: 1,
    title: "Customer",
    subTitle: "Sign up as a Customer to explore and discover",
    image: require("../../assets/onboarding/customer.png"),
  },
  {
    id: 2,
    title: "Partner",
    subTitle:
      "Unlock opportunities for collaboration and growth - join us as a partner today!",
    image: require("../../assets/onboarding/partner.png"),
  },
];

export default function SignUpAs({navigation}) {
  const theme = useTheme();
  const gStyle = GlobalStyles();

  const colors=theme.colors
  const semi = theme.fonts.semi;
  const regular = theme.fonts.regular;

  // State hooks
  const [selected, setSelected] = useState(data[0]);

  return (
    <RootView>
      <HeaderComp
        title={"You would like to Sign up as?"}
        style={styles.header}
        textStyle={styles.headerText}
      />

      {/* Customer and partner selection starts */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: height * 0.1 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={[gStyle.flexStyle, styles.selectionView, {borderColor:colors.border}, item==selected && {backgroundColor:colors.tertiary, borderColor:colors.tertiary}]} onPress={()=>{setSelected(item)}}>
            <Image
              source={item.image}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={{ flexShrink: 1 }}>
              <Text style={{ fontFamily: semi, fontSize: 16 }}>
                {item.title}
              </Text>
              <Text style={{ fontFamily: regular, fontSize: 18, lineHeight:23, marginTop:10 }}>
                {item.subTitle}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* Customer and partner selection ends */}

      <Button text={'Continue'} style={{marginBottom:height*0.05}} onPress={()=>navigation.navigate('SignUp')} />

    </RootView>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: "center", width: "60%", alignSelf: "center" },
  headerText: { textAlign: "center" },
  selectionView: {
    borderWidth: 1,
    padding: 16,
    marginBottom: height * 0.05,
    borderRadius: 16,
  },
  logo: { width: 50, height: 50, marginRight: 30 },
});
