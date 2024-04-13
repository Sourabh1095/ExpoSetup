import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { PaperProvider, configureFonts } from "react-native-paper";

import MainNavigator from "./navigation/Navigator";
import { LightTheme, DarkTheme } from "./constants/Theme";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const scheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    HBold: require("./assets/fonts/Harmattan-Bold.ttf"),
    HRegular: require("./assets/fonts/Harmattan-Regular.ttf"),
    PSemi: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }


  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <PaperProvider>
        <NavigationContainer theme={scheme == "light" ? LightTheme : DarkTheme}>
          <MainNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
