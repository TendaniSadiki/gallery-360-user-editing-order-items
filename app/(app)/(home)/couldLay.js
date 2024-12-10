import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../../providers/AuthProvider'
import UserHeaderCard from '../../../components/cards/UserHeaderCard';
import HeaderRightOptions from '../../../components/cards/HeaderRightOptions';
import HomeHeaderRight from '../../../components/HomeHeaderRight';
import BackIcon from '../../../components/BackIcon';
import { Ionicons } from '@expo/vector-icons';
import SignOutButton from '../../../components/buttons/SignOutButton';
import { NavigationContainer, DefaultTheme, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserDetails } from '../../../Context/UserDetailsContext';
import StackHeaderTitle from '../../../components/navigation/StackHeaderTitle';
import { Stack } from 'expo-router';


const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
};

const screenOptions = {
    headerTransparent: true,
    headerBackTitleVisible: true,
    headerBackVisible: true,
}
export const CouldLay = ({ cartItem, }) => {
    const userState = useContext(UserContext);
    const userDetails = useContext(UserDetails)

    useEffect(() => {
        // console.log({ userState });

    }, []);

    return (
        <Stack
            

        >
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerTitleAlign: "left",
                    headerTitleStyle: {
                        color: "#000",
                    },

                    // headerBackVisible: false,
                    headerShadowVisible: false,
                    headerStyle: {
                        height: 8,
                        backgroundColor: 'red'
                    },
                    headerTitle: null,
                    title: null,
                    // presentation: 'transperantModal',
                    headerShown: true,
                    headerTransparent: false,
                    // headerLeft: () => <UserHeaderCard
                    //     userDetails={userDetails}
                    //     navigation={navigation}
                    //     cartItem={cartItem}
                    // />,
                    // headerRight: () => <HeaderRightOptions userDetails={userDetails} cartItem={cartItem} navigation={navigation} />

                }}
            />

            <Stack.Screen
                name="art-preview"
                options={({ navigation, route }) => ({
                    ...screenOptions,
                    headerTintColor: "#fff",
                    headerTitle: () => (
                        <StackHeaderTitle title={route.params.artName} titleColor={"#F5F5F5"} />

                    ),
                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                    headerRight: () => (
                        <HeaderRightOptions userDetails={userDetails} cartItem={cartItem} navigation={navigation} />
                    )
                })}
            />

            <Stack.Screen
                name="art-scroll"
                options={({ navigation, route }) => ({
                    ...screenOptions,
                    headerTintColor: "#fff",
                    headerTitle: () => (
                        <StackHeaderTitle title={route.params.artName} titleColor={"#F5F5F5"} />
                    ),
                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                    headerRight: () => (
                        <HomeHeaderRight navigation={navigation} cartItem={cartItem} />
                    ),
                })}
            />

            <Stack.Screen
                options={({ navigation }) => ({
                    headerTransparent: false,
                    headerTintColor: "#fff",
                    headerTitleStyle: "#fff",
                    headerLeft: (props) => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="close" size={24} color={'black'} />
                        </TouchableOpacity>
                    )
                })}
                name="payments"
            />

            {/* <Stack.Screen
                options={{
                    ...screenOptions,
                    headerTintColor: "black",
                    // headerLeft: (props) => (
                    //     <BackIcon navigation={navigation} />
                    // ),
                }}
                name="artists"
            /> */}
            <Stack.Screen
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: "black",
                    headerTitleStyle: "black",
                    headerBackTitleVisible: false,
                    title: "Art Work",
                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                })}
                name="artworks"
            />

            <Stack.Screen
                name="exhibition-details"
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTransparent: true,
                    headerBackTitle: true,
                    headerBackVisible: false,
                    headerTintColor: "#fff",
                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                    headerTitle: () => (
                        <StackHeaderTitle title={'Exhibition'} titleColor={"#F5F5F5"} />
                    ),
                })}
            />
            <Stack.Screen
                screenOptions={({
                    headerStyle: {
                        height: 70
                    }
                })}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTransparent: true,
                    headerBackVisible: false,
                    cardStyle: {
                        backgroundColor: 'red'
                    },
                    headerStyle: {
                        height: 70
                    },
                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                    headerRight: () => {
                        return (<SignOutButton signOutUser={() => signoutUser()} />)
                    },
                    headerTitle: () => (
                        <StackHeaderTitle title={'Profile'} titleColor={"#22180E"} />
                    )
                })}
                name="user/profile"
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTransparent: true,
                    title: "Settings",
                    headerBackVisible: false,

                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                })}
                name="user/settings"
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTransparent: true,
                    title: "Notifications",
                    headerBackVisible: false,
                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                })}
                name="notifications"
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerShown: true,
                    ...screenOptions,
                    headerTitle: 'Cart',
                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                    headerTitle: () => (
                        <StackHeaderTitle title={'Cart'} titleColor={"#22180E"} />
                    ),
                    headerStyle: {
                        height: 60
                    }
                })}
                name="cart"
            />

            <Stack.Screen
                options={({ navigation }) => ({
                    headerShown: true,
                    ...screenOptions,
                    title: "Shipping Address",
                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                })}
                name="shipping-address"
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerShown: true,
                    ...screenOptions,
                    title: "Delivery Address",
                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                })}
                name="delivery-address"
            />
            <Stack.Screen
                options={({ navigation, route }) => ({
                    headerShown: true,
                    ...screenOptions,
                    headerTitle: "Preview",
                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                })}
                name="preview"
            />

            <Stack.Screen
                options={({ navigation }) => ({
                    headerShown: true,

                    headerTitle: "Search",
                    headerTransparent: true,
                    headerBackVisible: false,
                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                })}
                name="search"
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                    headerTitle: () => (
                        <StackHeaderTitle title={"T's And C's"} titleColor={"#22180E"} />
                    ),
                    headerTransparent: true,
                })}
                name="terms-and-conditions"
            />

            <Stack.Screen
                options={({ navigation }) => ({
                    headerShown: true,
                    ...screenOptions,
                    title: null,
                    headerStyle: {
                        height: 70
                    },
                    headerLeft: () => (
                        <BackIcon navigation={navigation} />
                    ),
                    headerRight: () => (
                        <HeaderRightOptions userDetails={userDetails} cartItem={cartItem} navigation={navigation} />
                    )
                })}
                name="artists/[id]"
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerShown: true,
                    ...screenOptions,
                    title: null,
                    headerStyle: {
                        height: 70
                    },
                    headerLeft: () => (
                        <BackIcon navigation={navigation} />
                    ),
                })}
                name="artists/[id]/biography"
                component={ArtistBiographyScreen}
            />
            <Stack.Screen
                options={({ navigation }) => ({
                    headerShown: true,
                    ...screenOptions,
                    headerTintColor: "#FFFFFF",
                    headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                    ),
                    headerTitle: () => (
                        <StackHeaderTitle title={"Preview All"} titleColor={"#F5F5F5"} />
                    ),
                })}
                name="PreviewMore"
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="payment/success"
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="payment/failure"
            />

            </Stack >
    )
}

const styles = StyleSheet.create({})