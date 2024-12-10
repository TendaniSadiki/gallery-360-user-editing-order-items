import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  Alert,
  Platform,
  StatusBar,
  Dimensions,
  Modal
} from "react-native";
import * as WebBrowser from "expo-web-browser";
// import { WebView } from 'react-native-webview';
import { Ionicons, Entypo } from "@expo/vector-icons";
import { auth, firestore } from "../../../services/firebase"
import { globalStyles } from "../../../assets/styles/GlobalStyles";
// import Toast from "react-native-simple-toast";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { BackHandler } from "react-native";
import { StackActions, useNavigationState } from "@react-navigation/native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSession } from "../../../providers/AuthProvider";
import { useCart } from "../../../providers/CartProvider";
import BackIcon from "../../../components/BackIcon";
import StackHeaderTitle from "../../../components/navigation/StackHeaderTitle";
import ScreenContainer from '../../../components/containers/ScreenContainer'
// import { PaymentSuccessfulIcon, PaymentUnsuccessfulIcon } from "../components/icons";
import TransparentHeaderView from "../../../components/TransparentHeaderView";
import { ActionButton } from "../../../components";
// import * as AuthSession from "expo-auth-session/src/AuthSession";



export default function CartScreen() {
  // console.log({ navigation });
  const params = useLocalSearchParams()


  const [cart, setCart] = useState(null);
  // const [price, setPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCalculatingPrice, setIsCalculatingPrice] = false
  const insets = useSafeAreaInsets()
  const routes = useNavigationState(state => state.routes)
  const router = useRouter()
  const { user: { uid } } = useSession()
  const { cartItem } = useCart()

  const getCart = () => {
    // console.log(uid);
    firestore
      .collection("cartItem")
      .doc(uid)
      .collection("items")
      .onSnapshot((snapShot) => {
        if (!snapShot.empty) {
          console.log(snapShot.size);
          let prices = []
          let cartItems = []
          // let artistItems = []
          snapShot.docs.forEach(doc => {
            // console.log(doc.data());
            prices = [...prices, doc.data().price]
            cartItems = [...cartItems, { ...doc.data(), imageUid: doc.id }]
          })
          //  console.log(artURLs, "this is the one image")
          const initialValue = 0;
          const totalAmounts = prices.reduce(
            (previousValue, currentValue) => Number(previousValue) + Number(currentValue),
            Number(initialValue)
          );
          console.log({ prices, cartItems });
          console.log(totalAmounts);

          setTotalAmount(totalAmounts);
          setCart(cartItems);
        }

      })
  };

  const deleteCart = async (artId, artistUid, price) => {
    const deleteItem = async () => {
      // console.log('key: ', keyy);
      const currentCart = cart
      const currentCartCounter = cartItem

      // setCart((cart) => {
      //   return cart.filter(item => item.imageUid !== artId)
      // })
      // setCartItem(cartItem => cartItem -= 1)
      // console.log({ uid, artId })
      await firestore.collection('cartItem').doc(uid).get().then(async doc => {
        const currentData = doc.data()
        let items = currentData.items
        let artistItemIndex = null
        items?.forEach((item, index) => {
          console.log({ artistUid, item: item.artistUid });

          if (item.artistUid === artistUid) {
            artistItemIndex = index
          }
        })
        console.log({ artistItemIndex });


        // return
        console.log(items.length);
        items[artistItemIndex].cartItems = items[artistItemIndex].cartItems?.filter(cartItem => {
          console.log({ c: cartItem.imageUid, artId });
          console.log(cartItem.imageUid !== artId);

          return cartItem.imageUid !== artId
        })
        if (items[artistItemIndex].cartItems.length === 0) {
          items = items?.filter((item, index) => item.artistUid !== artistUid)
        } else {
          console.log('def');

        }
        console.log({ items });

        // return
        await firestore.collection('cartItem').doc(uid).update({
          items: items,
          subtotal: currentData.subtotal - price,
          vat: ((currentData.subtotal - price) - Math.round(Number((currentData.subtotal - price)) / 1.15)).toFixed(2)
        }).then(async res => {
          await firestore
            .collection("cartItem")
            .doc(uid)
            .collection("items")
            .doc(artId)
            .delete()
            .then(async () => {
              // console.log('item deleted');
              // Toast.show("Your item has been deleted! ", Toast.LONG, Toast.CENTER);

            })
            .catch((error) => {
              // console.log('failed to delete');
              // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
              setCart([...currentCart])
              // setCartItem(currentCartCounter)
            });
        })
          .catch(err => {
            console.log(err);

          })
      })

    }
    Alert.alert(
      "Delete Item",
      "You are about to remove the item from the cart, continue?",
      [
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteItem() }
      ]
    );

  };
  const getDeliveryPrice = async() => {
    // setIsCalculatingPrice(true)
    // await firestore.collection('cartItem').doc(uid).get().then(doc => {
    //   if(doc.exists) {
    //     const artistItems = doc.data().items
    //     console.log(artistItems);
        
    //     return
    //     // const totalDeliveryPrice = Promise.all(artistItems.map(async item => {
    //     //   await getArtistPackagesDeliveryPrice(item)
    //     // }))
    //     // console.log(totalDeliveryPrice);
    //     // setIsCalculatingPrice(false)
    //   }
    // })
  }
  const getArtistPackagesDeliveryPrice= async(item) => {
    return 500
  } 
  useEffect(() => {
    // const showModal = route.params.paymentStatus ? true : false
    // const paymentStatus = route.params.paymentStatus || null

    //   console.log({
    //     statusInCart: route.params.paymentStatus,
    //     showModal: route.params.paymentStatus ? true : false
    //  });
    //   console.log({
    //     showModal, paymentStatus
    //   });
    // setPaymentStatus(paymentStatus)
    // setShowPaymentModal(showModal)
  }, [params])
  useEffect(() => {
    // window.location.href = baseUri;
    let isMounted = true;
    if (isMounted) {
      getCart();
      // console.log({ params: route.params });
    }
    const pop = StackActions.pop(1)
    BackHandler.addEventListener('hardwareBackPress', () => {
      const canNavigate = router.canGoBack()
      if (canNavigate) {
        // console.log({ canNavigate });
        router.back()
      }
      // console.log('Number of pages in the stack:', routes);
      return true
    })
    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
      isMounted = false;
    }
  }, []);

  //

  const Items = ({ name, price, imageUrl, artId, item, artistUid }) => {
    // console.log({ name, price, imageUrl, artId, item });
    // console.log({ itemID: item.imageUid });
    // console.log({ artistUid });

    return (
      <View style={globalStyles.flatlistView}>
        <View style={globalStyles.cancelIcon}>
          <Pressable style={{ width: 37, height: 37, cursor: 'pointer' }} onPress={() => deleteCart(artId, artistUid, price)}>
            <Ionicons
              name="close-outline"
              size={25}
              color="#FFFFFF"
              style={globalStyles.closeIconStyle}
            />
          </Pressable>
        </View>
        <Image source={{ uri: imageUrl }} style={globalStyles.cartImage} />
        <View style={globalStyles.priceContainer}>
          <Text numberOfLines={1} style={globalStyles.artTxtName}>{name}</Text>
          <Text style={globalStyles.priceTxt}>{`R${price}.00`}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        headerTransparent: true,
        headerStyle: {
          // height: 80,
          // backgroundColor: 'red'
        },
        headerBackVisible: false,
        headerLeft: (props) => (
          <BackIcon />
        ),
        headerTitle: () => (
          <StackHeaderTitle title={'Cart'} titleColor={"#22180E"} />
        ),
      }}

      />
      <ScreenContainer>
        <TransparentHeaderView>
          <View style={[styles.topLevelView, { paddingTop: 0 }]}>
            <View style={[{ paddingVertical: 10, flex: 1 }, styles.safeAreaContainer]}>
              <View style={{ flex: 6 }}>
                {cart && cart.length > 0 ? (
                  <FlatList
                    style={{ marginLeft: 10, marginRight: 10 }}
                    data={cart}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => `${item.imageUid}`}
                    renderItem={({ item }) => {
                      return (
                        <View>
                          <Items
                            imageUrl={item.artUrl}
                            name={item.title}
                            price={item.price}
                            artId={item.imageUid}
                            item={item}
                            artistUid={item.artistUid}
                          />
                        </View>
                      );
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: "70%",
                      height: 80,
                      backgroundColor: "lightgrey",
                      borderRadius: 20,
                      alignSelf: "center",
                      justifyContent: 'center',
                      top: 30,
                    }}
                  >
                    <Text
                      style={{ color: "#fff", alignSelf: "center", marginVertical: 0, fontSize: 16, fontWeight: 'bold' }}
                    >
                      No art has been added to cart
                    </Text>
                  </View>
                )}
                {/* <Modal
              visible={showPaymentModal}
              transparent={true}
              onRequestClose={() => {
                setShowPaymentModal(false)
              }}
              style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end' }}
            >
              <View style={{ flex: 1, width: Dimensions.get('window').width, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'flex-end' }}>

                <View style={{ gap: 30, width: Dimensions.get('window').width, backgroundColor: 'rgb(240, 240, 240)', display: 'flex', borderBottomWidth: 1, borderBottomColor: "rgb(100, 100, 100)", padding: 10, borderTopStartRadius: 20, borderTopRightRadius: 20 }}>
                  <View style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Pressable style={{}} onPress={() => setShowPaymentModal(false)}>
                      <Ionicons name='close' size={28} color={'rgb(100, 100, 100)'} />
                    </Pressable>
                  </View>
                  <View style={{ alignItems: 'center', marginBottom: -10 }}>
                    {paymentStatus === 'success' ? <PaymentSuccessfulIcon size={120} /> : <PaymentUnsuccessfulIcon size={120} />}
                  </View>

                  <Text style={{ paddingHorizontal: 10, color: paymentStatus === 'success' ? '#00BF7A' : '#D4413F', textAlign: 'center', fontSize: 16, fontWeight: 'bold', letterSpacing: 0.2 }}>{
                    paymentStatus === 'success' ? 'Payment was successful' : 'Payment was unsuccessful: ' + route.params.error + '. Retry, if problem persists contact admin' ?? 'click on the button to retry.'
                  }</Text>
                  <View
                    elevation={5}
                    style={{
                      width: "90%",
                      height: 50,
                      borderRadius: 20,
                      bottom: 0,
                      marginTop: 20,
                      backgroundColor: "#19120A",
                      alignSelf: "center",
                      justifyContent: "center",
                      marginBottom: 10,
                      shadowColor: 'black',
                      shadowRadius: 3,
                      shadowOpacity: 0.5,
                      shadowOffset: {
                        height: 2, width: 0
                      },
                      elevation: 4
                    }}
                  >
                    <Pressable
                      onPress={
                        () => paymentStatus === 'success' ? navigation.navigate('Market') : openWebView()
                      }
                    >
                      <Text
                        style={{ fontSize: 16, color: "#FFFFFF", textAlign: "center", fontWeight: 'bold', letterSpacing: 0.3 }}
                      >
                        {paymentStatus === 'success' ? 'Close' : 'Retry'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal> */}
              </View>

              <View style={[{ marginHorizontal: 20, height: 180 }, cartItem === 0 && { justifyContent: 'flex-end' }]}>
                {cartItem > 0 ? (
                  <View
                    style={{
                      borderRadius: 30,
                      width: '100%',
                      height: 180,
                      backgroundColor: "#FFFFFF",
                      alignSelf: "center",
                      justifyContent: 'space-around',
                      marginVertical: 0,
                      borderWidth: 1,
                      borderColor: "#E6E6E6",
                      // top: 55,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        marginHorizontal: 20,
                        marginVertical: 5,
                        // backgroundColor: 'red',
                        justifyContent: 'space-between'
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          // width: 150,
                          marginVertical: 10,
                          // backgroundColor: 'blue'
                        }}
                      >
                        <Text style={{ fontSize: 16, color: "gray", fontWeight: '700', letterSpacing: 0.3 }}>Items</Text>
                        {cartItem > 0 ? (
                          <Text style={{ fontSize: 16, color: "black", fontWeight: '900', letterSpacing: 0.3, marginTop: 15 }}>
                            {cartItem} Items
                          </Text>
                        ) : (
                          <Text style={{ fontSize: 16, color: "black" }}>No Items</Text>
                        )}
                      </View>

                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          // width: 140,
                          alignItems: 'flex-end',
                          marginVertical: 10,
                        }}
                      >
                        <Text style={{ fontSize: 16, color: "gray", fontWeight: '700', letterSpacing: 0.3 }}>Total Amount</Text>
                        {totalAmount > 0 ? (
                          <Text
                            style={{ fontSize: 24, color: "black", fontWeight: "900", letterSpacing: 0.3, marginTop: 15 }}
                          >{`R${totalAmount}.00`}</Text>
                        ) : (
                          <Text
                            style={{ fontSize: 24, color: "black", fontWeight: "bold" }}
                          >
                            R0.00
                          </Text>
                        )}
                      </View>
                    </View>

                    <ActionButton
                      onPress={getDeliveryPrice}
                      text={'Proceed to Checkout'}
                      style={styles.actionButton}
                      isLoading={isCalculatingPrice}
                    />
                  </View>
                ) : (
                  <ActionButton
                    onPress={() => { router.navigate({ pathname: '/' }) }}
                    text={'Browse Artworks'}
                    style={styles.actionButton}
                  />

                )}

              </View>
            </View>

          </View>
        </TransparentHeaderView>
      </ScreenContainer>
      {/* <ImageBackground
        source={image}
        style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height }}
      > */}




      {/* </ImageBackground > */}
    </>

  );
}

const image = require("../../../assets/images/home.png");
const statusBarHeight = StatusBar.currentHeight;
const paddingOnTop = Platform.OS === 'android' ? 60 : 60;
const navBarHeight = Dimensions.get('screen').height - Dimensions.get('window').height - StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // height: Dimensions.get('window').height,
    // paddingTop: paddingOnTop,
    // paddingBottom: Platform.OS === 'android' ? navBarHeight + 20 : 20,
  },
  topLevelView: {
    flex: 1,
    // height: Dimensions.get('window').height,
    // backgroundColor: 'red',
    // paddingBottom: 200,
    // borderColor: 'yellow',
    // borderWidth: 1
    // paddingTop: 57
  },
  safeAreaContainer: {
    // height: Dimensions.get('window').height - 57,
    // top: 57,
    // borderColor: 'blue',
    // borderWidth: 1,
    // display: 'flex'
  },
  safeAreaContainer: {
    // height: Dimensions.get('window').height - 57,
    // flex: 1,
    // top: 57,
    // borderColor: 'blue',
    // borderWidth: 1,
    display: 'flex'
  },
  actionButton: {
    width: "90%",
    height: 50,
    borderRadius: 20,
    bottom: 0,
    backgroundColor: "#19120A",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 2, width: 0
    },
    elevation: 4
  }
});
