import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import Splash from "../screens/Splash";
import Login from "../screens/Onboarding/Login";
import SignUpAs from "../screens/Onboarding/SignUpAs";
import SignUp from "../screens/Onboarding/SignUp";
import CreateAccount from "../screens/Onboarding/CreateAccount";
import Success from "../screens/Onboarding/Success";
import ForgotPassword from "../screens/Onboarding/ForgotPassword";
import OTP from "../screens/Onboarding/OTP";
import ResetPassword from "../screens/Onboarding/ResetPassword";
import SuccessPassword from "../screens/Onboarding/SuccessPassword";
import Home from "../screens/Dashboard/BottomTabs/Home";
import MyBookings from "../screens/Dashboard/BottomTabs/MyBookings";
import Profile from "../screens/Dashboard/BottomTabs/Profile";
import Filters from "../screens/Dashboard/Home/Filters";
import Notification from "../screens/Dashboard/Home/Notification";

const MainStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="Login" component={Login} />
      <OnboardingStack.Screen name="SignUpAs" component={SignUpAs} />
      <OnboardingStack.Screen name="SignUp" component={SignUp} />
      <OnboardingStack.Screen name="CreateAccount" component={CreateAccount} />
      <OnboardingStack.Screen name="Success" component={Success} />
      <OnboardingStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <OnboardingStack.Screen name="OTP" component={OTP} />
      <OnboardingStack.Screen name="ResetPassword" component={ResetPassword} />
      <OnboardingStack.Screen
        name="SuccessPassword"
        component={SuccessPassword}
      />
    </OnboardingStack.Navigator>
  );
};

const TabArr = [
  {
    route: "HomeNavigator",
    label: "Home",
    component: HomeNavigator,
    color: "red",
    icnName: "home",
  },
  {
    route: "MyBookings",
    label: "My Bookings",
    component: MyBookings,
    color: "red",
    icnName: "format-list-bulleted",
  },
  {
    route: "Profile",
    label: "Profile",
    component: Profile,
    color: "red",
    icnName: "account",
  },
];

const TabButton = (props) => {
  const { item, onPress, accessibilityState, theme } = props;
  const focused = accessibilityState.selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
    >
      <View style={{alignItems:'center'}}>
        <View style={{backgroundColor:focused?theme.colors.primary:'transparent', borderRadius:20, padding:5}}>
          <MaterialCommunityIcons
            name={item.icnName}
            size={24}
            color={focused?theme.colors.white:theme.colors.black}
          />
        </View>
        <View>
          <Text style={{fontFamily:theme.fonts.regular, fontSize:16, color:focused?theme.colors.primary:undefined}}>{item.label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TabNavigator = () => {
  const theme = useTheme();
  return (
    <TabStack.Navigator screenOptions={{ headerShown: false }}>
      {TabArr.map((item, index) => (
        <TabStack.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarLabel: item.label,
            tabBarButton: (props) => <TabButton {...props} item={item} theme={theme} />,
            tabBarStyle: { height: Platform.OS == "android" ? 90 : 100 },
          }}
        />
      ))}
    </TabStack.Navigator>
  );
};

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isLogged = useSelector((state) => state.isLogged);

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
      {isLogged.isLoggedIn ? (
        <MainStack.Screen name="Tabs" component={TabNavigator} />
      ) : (
        <MainStack.Screen name="Onboarding" component={OnboardingNavigator} />
      )}
      <MainStack.Group>
        <MainStack.Screen name="Filters" component={Filters} />
        <MainStack.Screen name="Notification" component={Notification} />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default MainNavigator;
