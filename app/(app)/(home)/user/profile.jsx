import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  Modal,
  TextInput,
  FlatList,
  // SafeAreaView,
  ActivityIndicator,
  Dimensions,
  StatusBar, ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firestore, auth, storageRef } from "../../../../services/firebase";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  Ionicons,
  EvilIcons,
  AntDesign,
} from "@expo/vector-icons";
import { globalStyles } from "../../../../assets/styles/GlobalStyles";
// import * as NavigationBar from 'expo-navigation-bar';


import LoaderImage from "../../../../components/LoaderImage";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from '@react-navigation/elements';
import { Cart, NotificationsIcon, SettingsIcon } from "../../../../components/icons";
import { ProfileOptionButton, SignOutButton } from "../../../../components";
import TransparentHeaderView from "../../../../components/TransparentHeaderView";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSession } from "../../../../providers/AuthProvider";
import StackHeaderTitle from "../../../../components/navigation/StackHeaderTitle";
import BackIcon from "../../../../components/BackIcon";
import { useCart } from "../../../../providers/CartProvider";
import ScreenContainer from "../../../../components/containers/ScreenContainer";
// import Toast from "react-native-simple-toast";

const background = require("../../../../assets/images/home.png");

export default function UserProfileScreen({ navigation }) {
  const [modalOpen, setModalOpen] = useState("");
  const [userName, setUserName] = useState('');
  const [submit, setSubmit] = useState(false);
  const [photoUri, setPhotoUri] = useState('')
  const [placeholder] = useState('https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-17.jpg')
  const params = useLocalSearchParams()


  const { isLoggedIn, toggleUserState } = useSession()
  const screenHeight = Dimensions.get('screen').height;
  const viewHeight = Dimensions.get('window').height;
  const viewWidth = Dimensions.get('window').width;
  const pageHeight = Dimensions.get('window').height
  const headerHeight = useHeaderHeight()
  const safeAreaInsets = useSafeAreaInsets()
  const router = useRouter()
  const { user: { uid, photoUrl } } = useSession()
  const [imageUri, setimageUri] = useState(`${photoUrl ?? 'https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-17.jpg'}`);

  const { cartItem } = useCart()

  // console.log({ headerHeight, safeAreaInsets });


  // console.log({ viewHeight, screenHeight });

  const openImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result.uri);

    if (!result.cancelled) {
      setSubmit(!submit);
      //setimageUri(result.uri);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed!"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.uri, true);
        xhr.send(null);
      });

      const ref = storageRef.child(new Date().toISOString());
      const snapshot = (await ref.put(blob)).ref
        .getDownloadURL()
        .then((imageUrl) => {
          setimageUri(imageUrl);
          // console.log(
          //   imageUrl,
          //   "this is setting the image too storage before 3"
          // );

          blob.close();
          setSubmit(false);
        });

      snapshot.snapshot.ref.getDownloadURL().then((imageUrl) => {
        // console.log(imageUrl, "this is setting the image too storage before 2");
        setPhoto(imageUrl);
      });
    } else {
      // console.log(result.uri);
      if (result.uri) setimageUri(result.uri)
    }
  };

  const updateUser = () => {
    // console.log('uuid: ', uuid);
    firestore
      .collection("users")
      .doc(uid)
      .update({
        fullName: userName,
        photoURL: imageUri,
      })
      .then(() => {
        // Toast.show(
        //   "you have successfully update your profile",
        //   Toast.LONG,
        //   Toast.CENTER
        // );
        setUserName(userName);
        // fullName = userName;
        setPhotoUri(imageUri)
        setModalOpen(false);

      })
      .catch((error) => {
        // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
  };
  useEffect(() => {
    // StatusBar.setHidden(true)
    let isMounted = true;
    if (isMounted) {
      firestore.collection('users').doc(uid).get().then(res => {
        // console.log(res.data())
        if (res.data()) {
          setUserName(res.data().fullName);
          setPhotoUri(res.data().photoURL);
        }
      })
    }
    return () => isMounted = false
  }, [])
  useEffect(() => {
    // console.log(imageUri);
  }, [imageUri])
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
        ),
        headerRight: () => {
          return (<SignOutButton />)
        },
        headerTitle: () => (
          <StackHeaderTitle title={'Profile'} titleColor={"#22180E"} />
        )
      }}
      />
      <ScreenContainer>
        <TransparentHeaderView>
          <View style={[{ flex: 1 }]}>
            <Modal visible={modalOpen} transparent>
              <View style={globalStyles.modalFullView}>
                <View style={globalStyles.modalContainer}>
                  <View style={globalStyles.closeBtnContaainer}>
                    <EvilIcons
                      onPress={() => setModalOpen(false)}
                      name="close"
                      size={21}
                      color="white"
                    />
                  </View>
                  <View style={globalStyles.editprofileImgContainer}>

                    {submit ? (
                      <LoaderImage
                        uri={imageUri ? imageUri : photoUri}
                        style={globalStyles.uploadedImage}
                      />
                    ) : (
                      <Image
                        source={{ uri: photoUri }}
                        placeholderStyle={{ backgroundColor: 'rgb(200, 200, 200)' }}
                        PlaceholderContent={<ActivityIndicator size="large" color={"#000"} />}
                        containerStyle={globalStyles.uploadedImage}
                        style={globalStyles.uploadedImage}
                      />
                      // <LoaderImage
                      //   uri={photoUri}
                      //   style={globalStyles.uploadedImage}
                      // />
                    )}

                    <AntDesign
                      onPress={() => openImageLibrary()}
                      style={globalStyles.imgAddIcon}
                      name="pluscircle"
                      size={35}
                      color="#E3E3E3"
                    />

                  </View>
                  <TextInput
                    placeholder="Edit Username"
                    onChangeText={(fullName) => setUserName(fullName)}
                    style={globalStyles.editUserInput}
                    value={userName}
                  />
                  <TouchableOpacity
                    style={globalStyles.updateBtn}
                    onPress={updateUser}
                  >
                    <Text style={globalStyles.modalText}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </Modal>


            {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
            <View style={styles.profileContainer}>
              <View style={globalStyles.profileImgContainer}>
                <View style={{ position: 'absolute', height: '90%', aspectRatio: 1, top: '-45%' }}>
                  {photoUri ? (
                    <LoaderImage
                      uri={photoUri}
                      style={globalStyles.profileImg}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTet-jk67T6SYdHW04eIMLygHzEeJKobi9zdg&usqp=CAU",
                      }}
                      style={globalStyles.profileImg}
                    />
                  )}
                </View>

                <Text style={globalStyles.userNameText}>{userName}</Text>
                <TouchableOpacity
                  onPress={() => setModalOpen(true)}
                  style={styles.editBtn}
                >
                  <Text style={globalStyles.btnText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={globalStyles.optionsContainer}>
              <ProfileOptionButton
                icon={<Cart size={24} dark />}
                text={'My Cart'}
                onPress={() => router.navigate('cart')}
              />
              <ProfileOptionButton
                icon={<NotificationsIcon size={24} dark />}
                text={'Notifications'}
                onPress={() => router.navigate({ href: 'notifications', params: { uuid: uid } })}
              />
              <ProfileOptionButton
                icon={<SettingsIcon size={24} dark />}
                text={'Settings'}
                onPress={() => router.navigate({ href: 'cart', params: { uuid: uid, cartItem: cartItem } })}
              />
              {/* <ProfileOptionButton text={'My Cart'} icon={<Cart dark size={24} onPress={() => navigation.navigate("Cart", { uuid: uuid, cartItem: cartItem })}/>}/> */}


            </View>
            {/* </ScrollView>        */}
          </View>
        </TransparentHeaderView>
      </ScreenContainer>


    </>

  )
  return (
    <ImageBackground source={background} resizeMode="cover" style={globalStyles.backgroundImg}>
      <View style={[styles.areaView, { paddingTop: headerHeight, paddingBottom: safeAreaInsets.bottom + 40 }]}>
        <ScrollView contentContainerStyle={[{ flex: 1, borderWidth: 1, borderColor: 'green' }]}>
          <Modal visible={modalOpen} transparent>
            <View style={globalStyles.modalFullView}>
              <View style={globalStyles.modalContainer}>
                <View style={globalStyles.closeBtnContaainer}>
                  <EvilIcons
                    onPress={() => setModalOpen(false)}
                    name="close"
                    size={21}
                    color="white"
                  />
                </View>
                <View style={globalStyles.editprofileImgContainer}>

                  {submit ? (
                    <LoaderImage
                      uri={imageUri ? imageUri : photoUri}
                      style={globalStyles.uploadedImage}
                    />
                  ) : (
                    <Image
                      source={{ uri: photoUri }}
                      placeholderStyle={{ backgroundColor: 'rgb(200, 200, 200)' }}
                      PlaceholderContent={<ActivityIndicator size="large" color={"#000"} />}
                      containerStyle={globalStyles.uploadedImage}
                      style={globalStyles.uploadedImage}
                    />
                    // <LoaderImage
                    //   uri={photoUri}
                    //   style={globalStyles.uploadedImage}
                    // />
                  )}

                  <AntDesign
                    onPress={() => openImageLibrary()}
                    style={globalStyles.imgAddIcon}
                    name="pluscircle"
                    size={35}
                    color="#E3E3E3"
                  />

                </View>
                <TextInput
                  placeholder="Edit Username"
                  onChangeText={(fullName) => setUserName(fullName)}
                  style={globalStyles.editUserInput}
                  value={userName}
                />
                <TouchableOpacity
                  style={globalStyles.updateBtn}
                  onPress={updateUser}
                >
                  <Text style={globalStyles.modalText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>

          </Modal>


          <View style={styles.profileContainer}>
            <View style={globalStyles.profileImgContainer}>
              <View style={{ position: 'absolute', height: '90%', aspectRatio: 1, top: '-45%' }}>
                {photoUri ? (
                  <LoaderImage
                    uri={photoUri}
                    style={globalStyles.profileImg}
                  />
                ) : (
                  <Image
                    source={{
                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTet-jk67T6SYdHW04eIMLygHzEeJKobi9zdg&usqp=CAU",
                    }}
                    style={globalStyles.profileImg}
                  />
                )}
              </View>

              <Text style={globalStyles.userNameText}>{userName}</Text>
              <TouchableOpacity
                onPress={() => setModalOpen(true)}
                style={styles.editBtn}
              >
                <Text style={globalStyles.btnText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={globalStyles.optionsContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Cart", { uuid: uuid, cartItem: cartItem })
              }
              style={styles.options}
            >
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Cart size={24} dark />
                <Text style={styles.optionsText}>
                  My Cart
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={30} color="black" />
            </TouchableOpacity>
            <ProfileOptionButton
              icon={<Cart size={24} dark />}
              text={'My Cart'}
              onPress={() => navigation.navigate("Cart", { uuid: uuid, cartItem: cartItem })}
            />
            <ProfileOptionButton
              icon={<NotificationsIcon size={24} dark />}
              text={'Notifications'}
              onPress={() => navigation.navigate("Cart", { uuid: uuid, cartItem: cartItem })}
            />
            <ProfileOptionButton
              icon={<SettingsIcon size={24} dark />}
              text={'Settings'}
              onPress={() => navigation.navigate("Cart", { uuid: uuid, cartItem: cartItem })}
            />
            {/* <ProfileOptionButton text={'My Cart'} icon={<Cart dark size={24} onPress={() => navigation.navigate("Cart", { uuid: uuid, cartItem: cartItem })}/>}/> */}

            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications", { uuid })}
              style={styles.options}
            >
              <Text style={styles.optionsText}>
                Notifications
              </Text>
            </TouchableOpacity>

            <View style={styles.options}>
              <Text style={styles.optionsText}>
                App Version
              </Text>
              <Text style={{ color: "gray", fontSize: 12 }}>v1.0.0</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  areaView: {
    // height: viewHeight,
    // marginTop: 60,
    // paddingTop: 60,
    flex: 1,
    borderColor: 'blue',
    backgroundColor: 'red',
    borderWidth: 3
  },
  topLevelView: {
    // maxHeight: viewHeight,
    flex: 1,
    // marginTop: 0,
    borderColor: 'green',
    borderWidth: 10
  },
  profileContainer: {
    flex: 7,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    // borderColor: 'blue',
    // borderWidth: 1,
    // backgroundColor: 'red'
    // height
  },
  editBtn: {
    width: 120,
    height: 50,
    backgroundColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
    // bottom: 70,e
    // top: 20
  },
  options: {
    alignSelf: "center",
    backgroundColor: "#E3E3E3",
    width: "100%",
    height: 50,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 20,
    // marginVertical: 10,
    borderColor: 'red',
    // borderWidth: 1
  },
  optionsText: {
    color: "#0E1822", fontSize: 16, fontWeight: "600"
  }
})