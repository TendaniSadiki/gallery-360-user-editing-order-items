import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from "react-native";
import React, { useContext, useState } from "react";
// import { Formik } from "formik";
import { globalStyles } from "../../../assets/styles/GlobalStyles";
import { firestore, auth } from "../../../services/firebase";
// import { useSession } from "../../../providers/AuthProvider";
import { Link, Stack, useRouter } from "expo-router";
import useAuth from "../../../hooks/useAuth";
import { useSession } from "../../../providers/AuthProvider";
import useAlert from "../../../hooks/useAlert";
import TransparentHeaderView from "../../../components/TransparentHeaderView";
// import Toast from "react-native-simple-toast";

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showIndicator, toggleIndicator] = useState(false)
  const { register, isLoading } = useSession()
  const router = useRouter()
  const alert = useAlert()

  const validate = () => {
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fullName == "" && email == "" && password == "") {
      // Toast.show("Both fields are empty", Toast.LONG, Toast.CENTER);
    } else if (fullName == "") {
      // Toast.show("Full name cannot be empty", Toast.LONG, Toast.CENTER);
    } else if (!reg.test(email)) {
      // Toast.show("Email is not valid", Toast.LONG, Toast.CENTER);
    } else if (password == "") {
      // Toast.show("Password cannot be empty", Toast.LONG, Toast.CENTER);
    }
  };
  const submitRegister = async () => {
    if (fullName !== "" && email !== "" && password !== "") {

      register(email, password).then(res => {

      }).catch(error => {
        if (error.code === "auth/email-already-in-use") {
          alert
        }
        if (error.code === "auth/invalid-email") {
          // Toast.show(
          //   "That email address is invalid!",
          //   Toast.LONG,
          //   Toast.CENTER
          // );
        } else {
          validate();
        }
      })
    }
  };
  return (
    <>
      <Stack.Screen options={{}} />

      <ImageBackground
        source={require("../../../assets/images/signUp/signUp.png")}
        style={{ width: Dimensions.get("window").width, height: Dimensions.get("screen").height }}
      // resizeMode='center'
      >
        <TransparentHeaderView paddingTop={0}>
          <KeyboardAvoidingView behavior="padding" style={{ borderColor: 'black', flex: 1 }}>
            <ScrollView>
              <View style={{ height: Dimensions.get('window').height * 0.45, }}>
                <View style={globalStyles.gallery360logo}>
                  <Image
                    source={require("../../../assets/images/signUp/signUpLogo.png")}
                  />
                </View>
                <View style={{ marginLeft: 33, marginTop: 10 }}>
                  <Text style={{ fontSize: 36, color: "#22180E" }}>Sign Up</Text>
                  <Text style={{ color: "#FFFFFF" }}>Create your new account</Text>
                </View>
              </View>
              <View style={{
                height: Dimensions.get('window').height * 0.55,
                backgroundColor: 'red',
                justifyContent: 'center',
                borderColor: 'black',
                borderWidth: 3,
                paddingBottom: 20
              }}>
                <View style={globalStyles.SectionStyle}>
                  <TextInput
                    style={globalStyles.inputStyle}
                    onChangeText={(fullName) => setFullName(fullName)}
                    value={fullName}
                    underlineColorAndroid="#f000"
                    placeholder="Full Name"
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize="sentences"
                    disabled={isLoading}
                  />
                </View>
                <View style={globalStyles.SectionStyle}>
                  <TextInput
                    style={[
                      globalStyles.inputStyle,
                      //  {borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#fff' : 'red'}
                    ]}
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    underlineColorAndroid="#f000"
                    placeholder="Email"
                    placeholderTextColor="#FFFFFF"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    disabled={isLoading}
                  />
                </View>
                <View style={globalStyles.SectionStyle}>
                  <TextInput
                    style={globalStyles.inputStyle}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                    underlineColorAndroid="#f000"
                    placeholder="Password"
                    placeholderTextColor="#FFFFFF"
                    returnKeyType="next"
                    secureTextEntry={true}
                    textContentType="password"
                    disabled={isLoading}
                  />
                </View>
                <Pressable
                  onPress={() => {
                    submitRegister() ? validate() : validate();
                  }}
                  style={[globalStyles.buttonStyle, isLoading && { filter: 'grayscale(0.6)' }]}
                  activeOpacity={0.5}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color='#FFF' size={30} style={{ alignSelf: 'center' }} />
                  ) : (
                    <Text style={globalStyles.buttonTextStyle}>Sign Up</Text>
                  )}
                </Pressable>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <Text style={{ color: '#FFF' }}>Already have an account?</Text>
                  <Link asChild href={{ pathname: 'sign-in' }}>
                    <Pressable>
                      <Text style={{ color: "#22180E" }}> Sign In</Text>
                    </Pressable>
                  </Link>
                </View>
              </View>
            </ScrollView>

          </KeyboardAvoidingView>
        </TransparentHeaderView>

      </ImageBackground>

    </>
  );
}

SignUpScreen.options = {
  headerShown: false
}