import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function DropdownComp({
  drpWidth,
  data,
  drpValue,
  setDrpValue,
  disable,
  backgroundColor,
  rightIcon,
  borderWidth,
  dropdownPosition,
  focus,
  setIsFocus,
  labelField,
  valueField
}) {
  const theme = useTheme();
  return (
    <Dropdown
      data={data}
      disable={disable}
      style={[
        styles.drp,
        {
          width: drpWidth,
          backgroundColor: backgroundColor,
          borderWidth: borderWidth,
          borderColor: drpValue==null? theme.colors.border:theme.colors.black,
        },
      ]}
      placeholderStyle={{ color: theme.colors.placeholder, fontSize: 20 }}
      labelField={labelField}
      valueField={valueField}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      value={drpValue}
      onChange={(item) => {setDrpValue(item); setIsFocus(false);}}
      fontFamily={theme.fonts.regular}
      selectedTextStyle={{ fontSize: 20 }}
      maxHeight={300}
      dropdownPosition={dropdownPosition}
      activeColor={theme.colors.primary}
      renderItem={({value}) => {
        return (
          <View style={{padding:16}}>
            <Text style={{color:drpValue?.value==value?'white':undefined, fontFamily:drpValue?.value==value?'HBold':"HRegular", fontSize:16}}>{value}</Text>
          </View>
        );
      }}
      placeholder="Select"
      itemTextStyle={{ fontSize: 20 }}
      renderRightIcon={() =>
        rightIcon ? (
          <AntDesign name={focus? "caretup":"caretdown"} size={16} color="black" />
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  drp: {
    height: 50,
    borderRadius: 14,
    padding: 16,
  },
});
