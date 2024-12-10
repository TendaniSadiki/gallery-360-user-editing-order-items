import { ImageBackground, StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
// import Toast from "react-native-simple-toast";
import { globalStyles } from "../../../../assets/styles/GlobalStyles";
import { auth, firestore } from "../../../../services/firebase";
import ScreenContainer from "../../../../components/containers/ScreenContainer";
import { Stack } from "expo-router";
import BackIcon from "../../../../components/BackIcon";

export default function UserSettingsScreen({ navigation }) {
  const signoutUser = async () => {
    try {
      await auth
        .signOut()
        .then(() => {
          // Toast.show("You have signed out!", Toast.LONG, Toast.CENTER);
          navigation.replace("SignIn");
        })
        .catch((error) => alert(error));
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        headerTransparent: true,
        headerBackVisible: true,
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
        <SafeAreaView style={{ top: 70 }}>
          <Pressable
            onPress={() => navigation.navigate("TermsAndConditions")}
            style={{
              top: 70,
              alignSelf: "center",
              backgroundColor: "#E3E3E3",
              width: "80%",
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#0E1822", fontSize: 16, fontWeight: "600" }}>
              Terms and Conditions
            </Text>
          </Pressable>

          <View
            style={{
              top: 70,
              alignSelf: "center",
              backgroundColor: "#E3E3E3",
              width: "80%",
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              borderRadius: 20,
              marginVertical: 10,
            }}
          >
            <Text style={{ color: "#0E1822", fontSize: 16, fontWeight: "600" }}>
              App Version
            </Text>
            <Text style={{ color: "gray", fontSize: 12 }}>v1.0.0</Text>
          </View>

          <Pressable
            style={{
              top: 70,
              alignSelf: "center",
              backgroundColor: "#E3E3E3",
              width: "80%",
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
            onPress={signoutUser}
          >
            <Text style={{ color: "#0E1822", fontSize: 16, fontWeight: "600" }}>
              Logout
            </Text>
          </Pressable>
        </SafeAreaView>
      </ScreenContainer>
    </>


  );
}

const styles = StyleSheet.create({});
