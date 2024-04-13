import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";

import Splash from "../screens/Splash";
import Login from "../screens/Onboarding/Login";
import SignUpAs from "../screens/Onboarding/SignUpAs";
import Home from "../screens/Dashboard/BottomTabs/Home";
import MyBookings from "../screens/Dashboard/BottomTabs/MyBookings";
import Profile from "../screens/Dashboard/BottomTabs/Profile";
import Filters from "../screens/Dashboard/Filters";

const MainStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Filters" component={Filters} />
    </HomeStack.Navigator>
  );
};

const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="Login" component={Login} />
      <OnboardingStack.Screen name="SignUpAs" component={SignUpAs} />
    </OnboardingStack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <TabStack.Navigator>
      <TabStack.Screen name="HomeNavigator" component={HomeNavigator} />
      <TabStack.Screen name="MyBookings" component={MyBookings} />
      <TabStack.Screen name="Profile" component={Profile} />
    </TabStack.Navigator>
  );
};

const MainNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 8000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <MainStack.Screen name="Splash" component={Splash} /> */}
      {isLoggedIn ? (
        <MainStack.Screen name="Tabs" component={TabNavigator} />
      ) : (
        <MainStack.Screen name="Onboarding" component={OnboardingNavigator} />
      )}
    </MainStack.Navigator>
  );
};

export default MainNavigator;
