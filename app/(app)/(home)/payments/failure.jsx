import React from "react";
import {
  ImageBackground,
  Image,
  Text,
  View,
  Pre,
  Pressable,
} from "react-native";
import ScreenContainer from "../../../../components/containers/ScreenContainer";
import { Stack } from "expo-router";
import BackIcon from "../../../../components/BackIcon";
// import { globalStyles } from "../assets/styles/GlobalStyles";

export default function PaymentFailureScreen({ navigation }) {

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        headerTransparent: true,
        title: null,
        headerStyle: {
          height: 80,
          // backgroundColor: 'red'
        },
        headerBackVisible: false,
        headerLeft: (props) => (
          <BackIcon />
        )
      }}

      />
      <ScreenContainer>
        <View style={{ flex: 1 }}></View>

        <View style={globalStyles.body}>
          <Image
            source={require("../../../../assets/images/payments/wrong.png")}
            style={globalStyles.wrongLogo}
            resizeMode="contain"
          />
          <Text style={globalStyles.paymeyntFailure}>Payment Failure</Text>
        </View>

        <View style={globalStyles.splashFooter}>
          <Pressable onPress={() => navigation.navigate("Cart")}>
            <Image
              source={require("../../../../assets/images/payments/image.png")}
              style={{ alignSelf: "center", width: 320 }}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </ScreenContainer>
    </>


  );
}
