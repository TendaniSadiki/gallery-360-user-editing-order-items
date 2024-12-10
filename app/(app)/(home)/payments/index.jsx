// import { useStripe } from "@stripe/stripe-react-native";
import { useState, useEffect } from "react";
import { Alert, Text, TouchableOpacity, View, StyleSheet, Dimensions, Pressable, ScrollView, Image } from "react-native";
import { auth, firestore } from "../../../../services/firebase";
import { router, Stack, useLocalSearchParams } from "expo-router";
import ScreenContainer from "../../../../components/containers/ScreenContainer";
import BackIcon from "../../../../components/BackIcon";
import { useSession } from "../../../../providers/AuthProvider";
import { ActionButton } from "../../../../components";
import TransparentHeaderView from "../../../../components/TransparentHeaderView";
import { useStripe } from "@stripe/stripe-react-native";
import { fetchPaymentSheetParams, fetchSecretKey, initializeSheet } from "../../../../services/stripe-requests";
import { createShipment, getItemDeliveryPrice } from "../../../../services/courier-guy";
import PriceItem from '../../../../components/text/PriceItem'

const COURIER_GUY_API = 'https://api.shiplogic.com/v2'
const COURIER_GUY_KEY = '7aad3ef6bded48e0805d24f8ef3e9566'
export default function PayPalPaymentScreen() {
  // const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [loading, setLoading] = useState(false);
  const { user: { uid } } = useSession()
  const [subTotal, setSubTotal] = useState(0);
  const [cartItems, setCartItems] = useState([])
  const [userDetails, setUserDetails] = useState({})
  const [shipmentItems, setShipmentItems] = useState([])
  const [deliveryTotal, setDeliveryTotal] = useState(500)
  const [prices, setPrices] = useState({
    vat: 0,
    grandTotal: 0,
    subtotal: 0,
    deliveryTotal: 0
  })


  const getTotalDelivery = async () => {
    firestore.collection('cartItem').doc(uid).get().then(async doc => {
      const { vat, grandTotal, subtotal, deliveryTotal } = doc.data()
      console.log({ vat, grandTotal, subtotal, deliveryTotal });

      setPrices({
        vat, grandTotal, subtotal, deliveryTotal
      })

    })
  }
  useEffect(() => {
    if (userDetails.physicalAddress && prices.grandTotal > 0) {
      // (async() => {
      console.log('here');
      console.log(userDetails);
      initializePaymentSheet()
      // })()
    }
  }, [userDetails, prices])
  const initializePaymentSheet = async () => {
    console.log('init payment sheet');
    console.log('haha');
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams(prices.grandTotal);
    console.log({ paymentIntent, ephemeralKey, customer });
    console.log({ userDetails });

    const { error } = await initializeSheet(userDetails, paymentIntent, ephemeralKey, customer);
    if (!error) {
      setLoading(true);
    }
  };
  const getShipmentItems = async() => {
    firestore.collection('cartItem').doc(uid).get().then(doc => {
      if(doc.exists) {
        setShipmentItems(doc.data().items)
      }
    })
  } 
  const openPaymentSheet = async () => {
    const result = await presentPaymentSheet({
      clientSecret: await fetchSecretKey()
    });
    console.log({ sheetResult: result });
    // const result = { error: null }
    if (result.error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      const docRef = firestore.collection('orders').doc()
      shipmentItems.forEach(item => {
        firestore.collection('orders').doc(docRef.id).collection('items').add({
          ...item, userID: uid
        }).then(async res => {
          // console.log({ item: item.address, userDetails, id: docRef.id });
          // return
          await createShipment(item, userDetails, docRef.id)
          item.cartItems.forEach(art => {
            firestore.collection('cartItem').doc(uid).collection('items').doc(art.imageUid).delete().then(res => {
              console.log('deleted: ', art.imageUid);
  
            }).catch(err => {
              console.log('error deleting: ', err);
            })
          })
        })
      })
      // return
      await firestore.collection('cartItem').doc(uid).get().then(async doc => {
        await firestore.collection('orders').doc(docRef.id).set({
          ...doc.data(),
          VAT: 0.15,
          VAT_amount: Number(doc.data().vat).toFixed(2),
          currencySymbol: 'R',
          customerID: uid,
          customer_address: {
            city: userDetails.physicalAddress.city,
            code: userDetails.physicalAddress.postalCode,
            company: '',
            country: userDetails.physicalAddress.countryCode,
            lat: userDetails.physicalAddress.lat,
            lng: userDetails.physicalAddress.lng,
            local_area: '',
            street_address: `${userDetails.physicalAddress.houseNumber} ${userDetails.physicalAddress.streetName}`,
            type: 'residential',
            zone: userDetails.physicalAddress.province
          },
          customer_contact: {
            name: userDetails.fullName,
            email: userDetails.email,
            mobile_number: userDetails.physicalAddress.phoneNumber
          },
          dateOfPurchase: (new Date()).toISOString(),
          deliveryStatus: 'Pending',
          deliveryFee: Number(doc.data().deliveryTotal).toFixed(2),
          subtotal: Number(doc.data().subtotal).toFixed(2),
          total: Number(doc.data().grandTotal).toFixed(2),
          special_instructions_delivery: "This is a test shipment - DO NOT DELIVER"
        }).then(async res => {
          await firestore.collection('cartItem').doc(uid).delete().then(res => {
            console.log('deleted');
            router.navigate('/')
          })
        }).catch(err => {
          console.error(err);
          
        })
      }).catch(err => {
        console.log('error adding: ', err);
        
      })


    }
  };

  const getUserDetails = () => {
    console.log('getting user details');

    firestore.collection('users').doc(uid).get().then(async (doc) => {
      if (doc.exists) {
        console.log({ det: doc.data() });

        setUserDetails({ ...doc.data() })

        getTotalDelivery()

      }

    })
  }
  const getCart = () => {
    // console.log(uid);
    firestore
      .collection("cartItem")
      .doc(uid)
      .collection("items")
      .get().then(docs => {
        if (docs.size > 0) {
          let cartItems = []
          docs.forEach(doc => {
            cartItems = [...cartItems, { ...doc.data(), id: doc.id }]
          })
          setCartItems(cartItems);
        }

      })
  };
  useEffect(() => {
    getUserDetails()
    getCart()
    getShipmentItems()
  }, []);
  const getArtWorks = () => {
    return firestore.collection(ARTWORK_COLLECTION).where("isEnabled", "==", true).onSnapshot(async (snapShot) => {
      // console.log({ artworks: 'searching'});
      if (!snapShot.empty) {
        // console.log('snapshot not empty');
        const art = await Promise.all(snapShot.docs.map(async (item) => ({
          ...item.data(),
          isArt: true,
          artUrl: item.data().imgUrls[0].imgUrl,
          ImageUid: item.id,
          artistUid: item.data().artistID,
          artName: item.data().title,
          ...(await getArtistDetails(item.data().artistID))
        })))
        // console.log('artworks: ', art);
        setTimeout(() => {
          toggleShowPlaceholder(false)
        }, 2400)
      } else {
        // console.log('snapshot empty');
      }

    })
  }
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
        <TransparentHeaderView style={{ paddingHorizontal: 0 }}>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 20 }}
          >
            {
              cartItems.map(item => {

                return (
                  <View key={item.id} style={styles.cartItemContainer}>
                    <Image
                      source={{ uri: item.imgUrls[0].imgUrl }}
                      resizeMode='cover'
                      style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Item</Text>
                        <Text style={styles.rightText}>
                          {item.title}
                        </Text>
                      </View>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Price</Text>
                        <Text style={styles.rightText}>
                          R{item.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
          <View
            style={styles.checkoutContainer}
          >
            <View style={styles.priceContainer}>
              <PriceItem label="Subtotal" price={prices.subtotal}/>
              <PriceItem label="VAT" price={prices.vat}/> 
              <PriceItem label="Delivery" price={prices.deliveryTotal}/> 
              <PriceItem label="Total Price" price={prices.grandTotal}/> 
            </View>
            <ActionButton
              text={'Checkout'}
              onPress={openPaymentSheet}
            />
          </View>
        </TransparentHeaderView>

      </ScreenContainer>
    </>


  );
}

const styles = StyleSheet.create({
  cartItemContainer: {
    height: 60,
    width: Dimensions.get('window').width - 40,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'rgb(140, 140, 140)',
    overflow: 'hidden',
    gap: 10,
    backgroundColor: 'rgb(230,230,230)'
  },
  itemImage: {
    height: 60,
    width: 60,
    backgroundColor: 'red'
  },
  itemDetails: {
    gap: 5,
    paddingRight: 10,
    paddingVertical: 10,
    flex: 1
  },
  rightText: {
    textAlign: 'right'
  },
  checkoutContainer: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    gap: 20,
    borderTopColor: 'rgb(220, 220, 220)',
    borderTopWidth: 0.5,
    zIndex: 5,
    backgroundColor: 'rgb(230, 230, 230)',
    padding: 20
  },
  priceContainer: {
    // paddingHorizontal: 20
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  priceLabel: {
    color: 'rgb(30, 30, 30)',
    fontSize: 12
  },
  price: {
    color: 'rgb(30, 30, 30)',
    fontSize: 12,
    fontWeight: '900'
  }
})
