import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  // SafeAreaView,
  Dimensions,
  Image,
  BackHandler,
} from "react-native";
import { globalStyles } from "../../../../assets/styles/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { firestore, auth } from "../../../../services/firebase";
// import Carousel from "react-native-snap-carousel";
import { StackActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import ScreenContainer from "../../../../components/containers/ScreenContainer";
import BackIcon from "../../../../components/BackIcon";

export default function ArtWorksScreen({ route, navigation }) {
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 9) / 5);
  const [art, setArt] = useState([]);
  const [state, setState] = useState();

  const { artistUid } = route.params;
  // const { artistUid } = route.params || { artistUid: 'DGghRcsny8hyLQa2NsrFA4IK1gj2'};

  const getArt = () => {
    return firestore
      .collection("Market")
      .where("ArtistUid", "==", artistUid)
      .where("status", "==", "approved")
      .onSnapshot((snapShot) => {
        const allArts = snapShot.docs.map((docSnap) => docSnap.data());
        setArt(allArts);
      });
  };
  useEffect(() => {
    // getArt();
    // return () => getArt();
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      const popAction = StackActions.pop(1);
      navigation.dispatch(popAction);
    })
    let isMounted = true
    if (isMounted) {
      getArt()
    }
    return () => {
      backHandler.remove()
      isMounted = false
    }
  }, []);

  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <Link asChild href={{
          pathname: 'art-preview', params: {
            artistUid: artistUid,
            imageUID: item.ImageUid,
          }
        }}>
          <Pressable>
            <Image
              source={{ uri: item.artUrl }}
              style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT, borderRadius: 16 }}
            />
            <View
              style={{
                backgroundColor: "#fff",
                height: 65,
                position: "absolute",
                borderRadius: 16,
                bottom: 8,
                left: 8,
                right: 8,
                justifyContent: "center",
              }}
            >
              <Text style={globalStyles.artNameTxt}>{item.artName}</Text>
              <Text style={globalStyles.artTypeTxt}>Artist</Text>
              {/* <Text style={globalStyles.artTypeTxt}>{item.email}</Text> */}
            </View>
          </Pressable>
        </Link>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        headerTransparent: true,
        title: 'Artworks',
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
        <SafeAreaView style={styles.topLevelView}>
          {/* <View style={styles.searchBarContainer}>
          <Ionicons style={{left:55, top:10}} name="search" size={25} color={'black'} />
                        
            <TextInput
              //onChangeText={}
              placeholder="Search"
              style={styles.searchInput}
            />
            <TouchableOpacity>
              <Text style={styles.searchBtnText}>Search</Text>
            </TouchableOpacity>
        </View> */}

          <View style={[globalStyles.homeBody1, { backgroundColor: 'blue' }]}>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              {/* <Carousel
              data={art}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              renderItem={_renderItem}
              onSnapToItem={(index) => setState({ index })}
              useScrollView={true}
            /> */}
            </View>
          </View>
        </SafeAreaView>
      </ScreenContainer>
    </>

  );
}

const imageBg = require("../../../../assets/images/home.png")

const styles = StyleSheet.create({
  container: {

  },
  topLevelView: {
    flex: 1,
    // backgroundColor: 'red'
  },
  searchInput: {
    width: "70%",
    height: 50,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 7,
    paddingHorizontal: 50,
    color: "black",
    //backgroundColor:'#fff'
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: 70,
  },
  searchBtnText: {
    color: "#FF5353",
    top: 10,
    fontSize: 15,
  },
});
