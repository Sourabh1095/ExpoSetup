import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
    buttonText:{color:theme.colors.white, fontFamily:bold, fontSize:22},
    flexStyle:{flexDirection:'row', alignItems:'center'}
  });
};
