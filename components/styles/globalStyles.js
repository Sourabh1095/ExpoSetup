import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { height } from "../util/Dimensions";

export const GlobalStyles = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const semi = theme.fonts.semi;
  const regular = theme.fonts.regular;
  const bold = theme.fonts.bold;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
      paddingBottom: insets.bottom,
      paddingHorizontal: 16,
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
    },
    headerText: {
      fontFamily: semi,
      fontSize: 24,
    },
    headerSubText: {
      fontFamily: regular,
      fontSize: 18,
    },
    headerView: { paddingTop: 16 },
    buttonView: {
      paddingVertical: 8,
      alignItems: "center",
      borderRadius: 16,
      backgroundColor: theme.colors.primary,
    },
    buttonText: { color: theme.colors.white, fontFamily: bold, fontSize: 22 },
    flexStyle: { flexDirection: "row", alignItems: "center" },
    flexBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    marginTop: { marginTop: height * 0.03 },
    back: { width: 25, height: 25, marginRight: 10 },
    centerView: { justifyContent: "center", alignItems: "center", flex: 1 },
    notificationElevation: {
      height: 40,
      width: 40,
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.white,
    },
    search: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 14,
      marginTop: 10,
    },
    categoryLogo: { width: 70, height: 70 },
    categoryText: {
      fontFamily: regular,
      fontSize: 14,
      color: theme.colors.category,
    },
    categoryText1: {
      fontFamily: regular,
      color: theme.colors.white,
      backgroundColor: theme.colors.black,
    },
    property: { fontFamily: bold, fontSize: 20 },
    area: { fontFamily: regular, fontSize: 16 },
  });
};
