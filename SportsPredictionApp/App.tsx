/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {  NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from 'react';
import ProfileScreen from './src/components/screen/ProfileScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GameStackNavigator from './src/navigation/games/GameStackNavigator';
import PredictionProvider from './src/context/PredictionContext';

enableScreens();

function App(): React.JSX.Element {

  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  useEffect(() => {
    const unsubscribe = navigationRef.current?.addListener('state', (e) => {
      console.log('Navigation state changed:', navigationRef.current?.getCurrentRoute());
    });
    return unsubscribe;
  }, []);
  
  const Tab = createBottomTabNavigator();

  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
  <SafeAreaProvider>
        <PredictionProvider>
          <NavigationContainer>
            <Tab.Navigator>
            <Tab.Screen name="GamesTab" component={GameStackNavigator} 
              options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
   </NavigationContainer>
        </PredictionProvider>
  </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}



export default App;

