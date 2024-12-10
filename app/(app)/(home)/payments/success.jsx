import {
  ImageBackground,
  Image,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { globalStyles } from "../../../../assets/styles/GlobalStyles";
import ScreenContainer from "../../../../components/containers/ScreenContainer";
import { Stack } from "expo-router";
import BackIcon from "../../../../components/BackIcon";

export default function PaymentSuccessScreen({ navigation }) {

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
        <View style={{ flex: 1 }}>{/*  */}</View>

        <View style={globalStyles.body}>
          <Image source={logo} style={globalStyles.wrongLogo} />
          <Text style={globalStyles.paymeyntSuccess}>Payment Success</Text>
        </View>

        <View style={globalStyles.splashFooter}>
          <Pressable onPress={() => navigation.navigate("Market")}>
            <Image
              source={btn}
              style={{ alignSelf: "center", width: 320 }}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </ScreenContainer>
    </>


  );
}

const bg = require("../../../../assets/images/payments/succesful.png");
const logo = require("../../../../assets/images/payments/right.png");
const btn = require("../../../../assets/images/payments/image.png");
