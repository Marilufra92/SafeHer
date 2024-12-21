import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import GeoLocationScreen from './screens/GeoLocationScreen';
import HelpScreen from './screens/HelpScreen';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';  
import { AlertProvider } from "./contexts/AlertContext"; 

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AlertProvider>
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'GeoLocation') {
                iconName = 'location';
              } else if (route.name === 'Help') {
                iconName = 'help-circle';
              }

              // Restituisce l'icona appropriata per ciascun tab
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#9061a9',
            tabBarInactiveTintColor: '#a4a2a6',
            headerShown: false, // Nascondi le intestazioni delle schermate
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="GeoLocation" component={GeoLocationScreen} />
          <Tab.Screen name="Help" component={HelpScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    </AlertProvider>
  );
}



