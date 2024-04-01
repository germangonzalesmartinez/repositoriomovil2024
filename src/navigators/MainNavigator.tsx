import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Onboarding1 } from "../screens/Onboarding1";
import { Onboarding2 } from "../screens/Onboarding2";
import { Onboarding3 } from "../screens/Onboarding3";
import { Home } from "../screens/Home";
import { Information } from "../screens/Information";
import { Contact } from "../screens/Contact";
import ApleMusic from "../screens/ApleMusic";
import Settings from "../screens/Settings";
import Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Inicio"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <SimpleLineIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Usuarios"
        component={Contact}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Opciones"
        component={Settings}
        options={{
          drawerIcon: ({ color, size }) => (
            <SimpleLineIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const OnboardingStack = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding1">
      <Stack.Screen
        name="Onboarding1"
        component={Onboarding1}
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="Onboarding2"
        component={Onboarding2}
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="Onboarding3"
        component={Onboarding3}
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home" // Establezca la pantalla inicial aquí
      screenOptions={{
        tabBarActiveTintColor: "orange", // Color de los íconos activos
        tabBarInactiveTintColor: "#FFFFFF", // Color de los íconos inactivos
        tabBarStyle: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          elevation: 0,
          borderTopWidth: 0,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Galeria"
        component={Information}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Usuarios"
        component={Contact}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AplePay"
        component={ApleMusic}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="music" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Opciones"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="OnboardingStack" component={OnboardingStack} />
        <Drawer.Screen name="TabNavigator" component={DrawerNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
