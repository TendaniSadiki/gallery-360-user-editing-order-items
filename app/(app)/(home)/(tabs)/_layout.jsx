import { Dimensions, Image, ImageBackground, Platform, StatusBar, StyleSheet, View } from "react-native";
import TabBarComponent from "../../../../components/navigation/TabBarComponent";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
// import { useHeaderHeight } from '@react-navigation/elements';
import { useEffect } from "react";
import { Text } from "react-native";
import { Stack, Tabs } from "expo-router";
import { useCart } from '@/providers/CartProvider'
import { useSession } from "@/providers/AuthProvider";
import HeaderRightOptions from '@/components/cards/HeaderRightOptions'
import UserHeaderCard from '@/components/cards/UserHeaderCard'

const background = require("../../../../assets/images/home.png");
const TabLayout = () => {
    const insets = useSafeAreaInsets()
    const { cartItem, updateCart } = useCart()
    const { user } = useSession()
    // let headerHeight = 0
    if (Platform.OS !== 'web') {
        // headerHeight = useHeaderHeight()
    }

    // console.log({ insets, headerHeight });

    // return(
    //     <View style={styles.container}>

    //     </View>
    // )
    useEffect(() => {
        updateCart()
        // console.log({ insets, headerHeight });
    }, [])
    return (
        <>
            <Stack.Screen options={{
                headerTitleAlign: "left",
                headerTitleStyle: {
                    color: "#000",
                },

                // headerBackVisible: false,
                headerShadowVisible: false,
                headerStyle: {
                    height: 80,
                    // backgroundColor: 'red'
                },
                headerTitle: null,
                title: null,
                // presentation: 'transperantModal',
                headerShown: true,
                headerTransparent: true,
                headerLeft: () => <UserHeaderCard
                    userDetails={user}
                    cartItem={cartItem}
                />,
                headerRight: () => <HeaderRightOptions userDetails={user} cartItem={cartItem} />
            }} />
            <Tabs
                screenOptions={{
                    swipeEnabled: false,
                    headerShown: true,
                    headerTransparent: true,
                    tabBarStyle: {
                        backgroundColor: 'transparent',
                        position: 'relative',
                        top: 0,
                        zIndex: 1
                    }
                }}
                tabBar={props => <TabBarComponent {...props} />}
                backBehavior="history"
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        headerShown: false,
                        title: 'Market'
                    }}
                />
                <Tabs.Screen
                    name="exhibition"
                    options={{
                        headerShown: false,
                        title: 'Exhibition'
                    }}
                />
            </Tabs>
        </>

    );

    return (
        // <ImageBackground source={background} style={[styles.container, { paddingTop: headerHeight + 10 }]}>
        <Tabs screenOptions={{ swipeEnabled: false, headerShown: true }} tabBar={props => <TabBarComponent {...props} />}>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: 'Market'
                }}
            />
            <Tabs.Screen
                name="exhibition"
                options={{
                    headerShown: false,
                    title: 'Exhibition'
                }}
            />
        </Tabs>
        // </ImageBackground>
    );
};

export default TabLayout;
// console.log(Platform);
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0
const paddingTop = Platform.OS === 'android' || Platform.OS === 'web' ? 60 : 0
const navBarHeight = Dimensions.get('screen').height - Dimensions.get('window').height - StatusBar.currentHeight;
// console.log(navBarHeight);
const styles = StyleSheet.create({
    container: {
        top: 0,
        height: Dimensions.get('screen').height,
        // top: -2000,
        width: "100%",
        // paddingTop: paddingTop, //paddingTop,
        // paddingBottom: Platform.OS === 'android' ? navBarHeight : 0,
        // paddingTop: 60,
        borderWidth: 1,
        borderColor: 'blue',
        // backgroundColor: 'blue',
        // marginBottom: 30,
        zIndex: 1
    },
    containers: {
        // top: -20,
        height: Dimensions.get('screen').height,
        width: "100%",
        paddingTop: paddingTop,
        paddingBottom: Platform.OS === 'android' ? navBarHeight : 0,
        // borderWidth: 1,
        // borderColor: 'red'
    }
})