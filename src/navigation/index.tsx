import analytics from '@react-native-firebase/analytics';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddIcon, useTheme } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Home, RemoteConfig, Setting, SignIn, SignUp, Splash } from '../screens';

const SignInStack = createNativeStackNavigator<ReactNavigation.SignInStackParamList>();
export function SignInStackNavigator() {
  return (
    <SignInStack.Navigator initialRouteName="SignInScreen" screenOptions={{ headerShown: false }}>
      <SignInStack.Screen name="SignInScreen" component={SignIn} />
      <SignInStack.Screen name="SignUpScreen" component={SignUp} />
      <SignInStack.Screen name="HomeTabNavigator" component={HomeTabNavigator} />
      <SignInStack.Screen name="RemoteConfigScreen" component={RemoteConfig} />
    </SignInStack.Navigator>
  );
}

const SettingStack = createNativeStackNavigator<ReactNavigation.SettingStackParamList>();
export function SettingStackNavigator() {
  return (
    <SettingStack.Navigator initialRouteName="SettingScreen" screenOptions={{ headerShown: false }}>
      <SettingStack.Screen name="SettingScreen" component={Setting} />
    </SettingStack.Navigator>
  );
}

const HomeTab = createBottomTabNavigator<ReactNavigation.HomeTabParamList>();
export function HomeTabNavigator() {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <HomeTab.Navigator
      initialRouteName="HomeStackNavigator"
      screenOptions={{
        tabBarActiveTintColor: colors.lightBlue[100],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: 10,
        },
      }}
    >
      <HomeTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AddIcon color={focused ? colors.blue[700] : colors.coolGray[900]} size={'3xl'} />
          ),
        }}
        name="HomeStackNavigator"
        component={Home}
      />
      <HomeTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AddIcon color={focused ? colors.blue[700] : colors.coolGray[900]} size={'3xl'} />
          ),
        }}
        name="SettingStackNavigator"
        component={SettingStackNavigator}
      />
    </HomeTab.Navigator>
  );
}

const SplashStack = createNativeStackNavigator();
export function SplashNavigator() {
  return (
    <SplashStack.Navigator initialRouteName="SplashScreen">
      <SplashStack.Screen
        name="SplashScreen"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
    </SplashStack.Navigator>
  );
}

function Router() {
  const [loading, setLoading] = useState(true);
  const routeNameRef = React.useRef<any>();
  const navigationRef = React.useRef<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      {loading ? <SplashNavigator /> : <SignInStackNavigator />}
    </NavigationContainer>
  );
}

export default Router;
