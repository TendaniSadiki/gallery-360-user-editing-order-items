import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Alert,
  ScrollView
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
// import { Formik } from "formik";
// import { LinearGradient } from "expo-linear-gradient";
// import Toast from "react-native-simple-toast";
// firebase
import { auth } from "../../../services/firebase";
// components
// import AppLoader from "../assets/components/AppLoader";
import { LinearGradient } from "react-native-svg";
// import { globalStyles } from "../assets/styles/GlobalStyles";

import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { useSession } from "../../../providers/AuthProvider";
import useAlert from "../../../hooks/useAlert";
import TransparentHeaderView from "../../../components/TransparentHeaderView";
// import { ActionButton } from "../components";
// ikmpor {{ SafeAreaView}} from "react-native-safe-area-context";

// main
export default function SignInScreen({ navigation }) {

  // set state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errortext, setErrortext] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, toggleUserState, logIn } = useSession()
  const alert = useAlert()
  useEffect(() => {
    // console.log('on login');
    // console.log({ loading });
  }, [loading])
  // form validation

  //
  const handleSignIn = () => {
    if (email === "" && password === "") {
      alert('Missing inputs', 'Email and password are missing')
      console.log('Email and password are missing')
    } else if (email === "" || password === "") {
      alert('Missing inputs', 'Either email or password is missing')
      console.log('Either email or password is missing')
    } else {
      logIn(email, password)
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <ImageBackground
        source={require("../../../assets/images/signIn/bg.png")}
        style={{ width: Dimensions.get("window").width, height: Dimensions.get("screen").height }}
      >
        <TransparentHeaderView paddingTop={0}>
          <KeyboardAvoidingView behavior="padding" style={{ borderColor: 'black', flex: 1 }}>
            <ScrollView contentContainerStyle={{}}>
              {/* <View style={{ height: Dimensions.get('window').height, bottom: 0 }}> */}
              <View style={{ height: Dimensions.get('window').height * 0.45 }}>
                <View style={styles.gallery360logo}>
                  <Image
                    source={require("../../../assets/images/signIn/SignInLogo.png")}
                  />
                </View>
              </View>
              <View style={{ height: Dimensions.get('window').height * 0.55 }}>
                <View>
                  <View style={{ marginLeft: 33, marginBottom: 15 }}>
                    <Text style={{ fontSize: 36, color: "#22180E" }}>
                      Welcome Back !
                    </Text>
                    <Text style={{ color: "#FFFFFF" }}>
                      Login to your account
                    </Text>
                  </View>
                </View>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    underlineColorAndroid="#f000"
                    placeholder="Email"
                    placeholderTextColor="#FFFFFF"
                    keyboardType="email-address"
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                    underlineColorAndroid="#f000"
                    placeholder="Password"
                    placeholderTextColor="#FFFFFF"
                    returnKeyType="next"
                    secureTextEntry={true}
                  />
                </View>
                <Pressable
                  onPress={handleSignIn}
                  activeOpacity={0.5}
                >
                  <View
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonTextStyle}>Sign In</Text>
                  </View>
                </Pressable>
                <Link asChild href={{ pathname: 'sign-up' }}>
                  <Pressable style={{ alignSelf: 'center', marginBottom: 10 }}>
                    <Text style={{ color: '#22180E' }}>Forgot password </Text>
                  </Pressable>
                </Link>

                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <Text style={{ color: '#FFF' }}>Don't have an account?</Text>
                  <Text>
                    <Link asChild href={{ pathname: 'sign-up' }}>
                      <Pressable>
                        <Text style={{ color: "#22180E" }}> Sign Up</Text>
                      </Pressable>
                    </Link>
                  </Text>
                </View>
              </View>
              {/* </View> */}

            </ScrollView>

          </KeyboardAvoidingView>
        </TransparentHeaderView>

      </ImageBackground>
    </>

  )
  //
}

const styles = StyleSheet.create({
  imageBack: {
    height: Dimensions.get("window").height,
  },
  buttonStyle: {
    backgroundColor: "#0E1822",
    borderWidth: 0,
    color: "#fff",
    borderColor: "#7DE24E",
    height: 50,
    alignItems: "center",
    borderRadius: 14,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 20,
    justifyContent: 'center'
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 13,
    fontSize: 16,

  },
  inputStyle: {
    flex: 1,
    color: "white",
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#FFFFFF",
  },
  errors: {
    // fontSize: 12,
    color: "red",
    // fontWeight: 'bold',
    marginTop: 5,
    marginHorizontal: 35,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 17,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#0E1822",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 50,
    alignItems: "center",
    borderRadius: 14,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 20,
    justifyContent: 'center',
    // backgroundColor: 'yellow'
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 13,
    fontSize: 16,
    textAlign: 'center',
    // backgroundColor: 'red',
    alignSelf: 'center'
  },
  gallery360logo: {
    height: 226,
    width: 166,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 45,
  },
});
