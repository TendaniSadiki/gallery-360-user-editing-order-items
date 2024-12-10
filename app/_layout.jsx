import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';


// added from g360 

// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, createContext } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Platform, StatusBar, Dimensions, ImageBackground, ImageBackgroundBase, BackHandler } from "react-native";

import { firestore, auth } from '@/services/firebase';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import * as NavigationBar from 'expo-navigation-bar';

import { UserDetails } from "@/Context/UserDetailsContext";
import MainNavigation from '../components/navigation/MainNavigation'
import { AuthProvider } from '../providers/AuthProvider';
import CartProvider from '../providers/CartProvider';

import PaymentProvider from '../providers/PaymentProvider'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  useEffect(() => {
    // StatusBar.setBackgroundColor('transparent')
    // StatusBar.setTranslucent(true);
    // NavigationBar.setVisibilityAsync(false)
    if (Platform.OS === 'android') {
      // StatusBar.setBackgroundColor('#ceb89e')
      StatusBar.setBackgroundColor('transparent')
      NavigationBar.setBackgroundColorAsync('#ceb89e')
      // NavigationBar.setBackgroundColorAsync('transparent')
    }
    let isMounted = true;
    if (isMounted) {

      // console.log({ userExist });
      // setUserState(!!userExist)/

    }
    // BackHandler.addEventListener('hardwareBackPress', () => );

    return () => {
      isMounted = false
      // BackHandler.removeEventListener('hardwareBackPress')
    };
  }, []);

  useEffect(() => {
    console.log('loaded successfully');

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  console.log('haha');


  return (
    <>
      {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
      <PaymentProvider>
        <AuthProvider>
          <CartProvider>
            <Slot />
          </CartProvider>
        </AuthProvider>
      </PaymentProvider>
      {/* </ThemeProvider> */}
    </>
  );
}