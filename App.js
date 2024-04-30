import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import MainNavigator from "./navigation/Navigator";
import { LightTheme, DarkTheme } from "./constants/Theme";
import { store } from "./redux/reducer/store";

let persistor = persistStore(store);

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
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <NavigationContainer
              theme={scheme == "light" ? LightTheme : DarkTheme}
            >
              <MainNavigator />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
