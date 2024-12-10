import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSession } from '../../../providers/AuthProvider'
import UserHeaderCard from '../../../components/cards/UserHeaderCard';
import HeaderRightOptions from '../../../components/cards/HeaderRightOptions';
import HomeHeaderRight from '../../../components/HomeHeaderRight';
import BackIcon from '../../../components/BackIcon';
import { Ionicons } from '@expo/vector-icons';
import SignOutButton from '../../../components/buttons/SignOutButton';
// import { NavigationContainer, DefaultTheme, StackActions } from "@react-navigation/native";
import { UserDetails } from '../../../Context/UserDetailsContext';
import StackHeaderTitle from '../../../components/navigation/StackHeaderTitle';
import { Stack } from 'expo-router';
import { useCart } from '../../../providers/CartProvider';


// const navTheme = {
//     ...DefaultTheme,
//     colors: {
//         ...DefaultTheme.colors,
//         background: 'transparent',
//     },
// };

const screenOptions = {
    headerTransparent: true,
    headerBackTitleVisible: true,
    headerBackVisible: true,
}
export const HomeLayout = ({ cartItem, }) => {
    const userDetails = useSession()
    const { updateCart } = useCart()

    useEffect(() => {
        // console.log({ userState });
        updateCart()
        console.log('updating cart');
        
    }, []);

    return (
        <Stack
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name="(tabs)"
            />

            <Stack.Screen
                name="art-preview"
            />

            <Stack.Screen
                name="art-scroll"
            />

            <Stack.Screen
                name="payments"
            />

            <Stack.Screen
                name="artists"
                options={{
                    headerShown: true
                }}
            />
            <Stack.Screen
                name="artworks"
            />

            <Stack.Screen
                name="buggy"
            />
            <Stack.Screen
                name="user/profile"
            />
            <Stack.Screen
                name="user/settings"
            />
            <Stack.Screen
                name="notifications"
            />
            <Stack.Screen
                name="cart"
                options={{ 
                    headerShown: true
                }}
            />

            <Stack.Screen
                name="shipping-address"
            />
            <Stack.Screen
                name="delivery-address"
            />
            <Stack.Screen
                name="preview"
            />

            <Stack.Screen
                name="search"
            />
            <Stack.Screen
                name="terms-and-conditions"
            />

            <Stack.Screen
                name="artists/[id]"
            />
            <Stack.Screen
                name="artists/[id]/biography"
            />
            <Stack.Screen
                name="PreviewMore"
            />
            <Stack.Screen
                name="payment/success"
            />
            <Stack.Screen
                name="payment/failure"
            />

        </Stack >
    )
}

const styles = StyleSheet.create({})