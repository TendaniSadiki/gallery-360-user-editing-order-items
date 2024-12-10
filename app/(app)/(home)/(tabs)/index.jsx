import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
//
import { firestore } from "../../../../services/firebase";
// import { globalStyles } from "../../../../assets/styles/GlobalStyles";
// import Skeleton from "../assets/components/Skeleton";
// import LoaderImage from "../assets/components/LoaderImage";
// import ArtistScrollView from "../assets/components/ArtistScrollView";
// import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ArtworksSection, CreatorsSection, MarketFlatlistView } from "../../../../components/sections";
import { ScrollableFilterCard, TabContent } from "../../../../components";
import ScreenContainer from "../../../../components/containers/ScreenContainer";
import { router } from "expo-router";
// import { useHeaderHeight } from "@react-navigation/elements";
// const background = require("../assets/images/home.png");
//
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH - 40);
// const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 6.2) / 5.2);

const screenHeight = Dimensions.get('window').height
const carouselHeight = (screenHeight - 300)
const ITEM_HEIGHT = carouselHeight;
// console.log({ statusBarHeight, paddingOnTop,navBarHeight,  screenHeight, carouselHeight });
//
// console.log('market height: ' + screenHeight);
const background = require("../../../../assets/images/home.png");
export default function MarketScreen({ navigation }) {

  //
  const [artist, setArtist] = useState([]);
  const [state, setState] = useState();
  const [data, setData] = useState(null);
  const [artwork, setArtwork] = useState([])
  const [filteredArtworks, setFilteredArtworks] = useState(null)
  const [showPlaceholder, toggleShowPlaceholder] = useState(true)
  const ARTWORK_COLLECTION = "Market"
  const ARTIST_COLLECTION = "artists"

  const getArtist = () => {
    return firestore
      .collection(ARTIST_COLLECTION)
      .orderBy("timeStamp", "desc")
      .where("isEnabled", '==', true)
      // .limit(3)
      .onSnapshot((snapShot) => {
        const allArtists = snapShot.docs.map((docSnap) => {
          // console.log({ ...docSnap.data(), id: docSnap.id });
          
          return {
          ...docSnap.data(),
          artistUid: docSnap.id
        }});
        getArtWorks(allArtists.map(artist => artist.artistUid))
        setArtist(allArtists);
      });
  };

  const sortArtist = (sortMethod) => {
    // console.log({ sortMethod });
    // console.log({ artist });c
    // console.log({ sortMethod });
    if (sortMethod === 'new') sortAscTimestamp(artist)
    if (sortMethod === 'old') sortDescTimeStamp(artist)
    if (sortMethod === 'z-a') sortDescName(artist)
    if (sortMethod === 'a-z') sortAscName(artist)
  }
  const sortArtworks = (sortMethod) => {
    // console.log({ sortMethod });
    // console.log({ artist });c
    if (sortMethod === 'new') sortAscArtTimestamp(artist)
    if (sortMethod === 'old') sortDescArtTimeStamp(artist)
    if (sortMethod === 'z-a') sortDescArtname(artist)
    if (sortMethod === 'a-z') sortAscArtname(artist)
  }
  const sortAscName = (array) => {
    try {
      setArtist([...artist].sort((a, b) => a.artistName.localeCompare(b.artistName)))
    } catch (error) {
      // console.log(error);
    }
  }
  const sortDescName = (array) => {
    try {
      setArtist([...artist].sort((a, b) => b.artistName.localeCompare(a.artistName)))
    } catch (error) {
      // console.log(error);
    }
  }
  const sortDescTimeStamp = () => {
    try {
      setArtist((artist) => [...artist].sort((a, b) => a.timeStamp.toDate() - b.timeStamp.toDate()))
    } catch (error) {
      // console.log(error);
    }
  }
  const sortAscTimestamp = () => {
    try {
      setArtist((artist) => [...artist].sort((a, b) => b.timeStamp.toDate() - a.timeStamp.toDate()))
    } catch (error) {
      // console.log(error);
    }
  }
  const sortAscArtname = (array) => {
    try {
      if (filteredArtworks) {
        setFilteredArtworks([...filterArtworks].sort((a, b) => a.artName.localeCompare(b.artName)))
      }
      setArtwork([...artwork].sort((a, b) => a.artName.localeCompare(b.artName)))
    } catch (error) {
      // console.log(error);
    }
  }
  const sortDescArtname = (array) => {
    try {
      if (filteredArtworks) {
        setFilteredArtworks([...filteredArtworks].sort((a, b) => b.artName.localeCompare(a.artName)))
      }
      setArtwork([...artwork].sort((a, b) => b.artName.localeCompare(a.artName)))
    } catch (error) {
      // console.log(error);
    }
  }
  const sortDescArtTimeStamp = () => {
    try {
      if (filteredArtworks) {
        setFilteredArtworks([...filteredArtworks].sort((a, b) => a.timeStamp.toDate() - b.timeStamp.toDate()))
      }
      setArtwork(artwork => artwork.sort((a, b) => a.timeStamp.toDate() - b.timeStamp.toDate()))
    } catch (error) {
      // console.log(error);
    }
  }
  const sortAscArtTimestamp = () => {
    try {
      if (filteredArtworks) {
        setFilteredArtworks([...filteredArtworks].sort((a, b) => b.timeStamp.toDate() - a.timeStamp.toDate()))
      }
      setArtwork(artwork => artwork.sort((a, b) => b.timeStamp.toDate() - a.timeStamp.toDate()))
    } catch (error) {
      // console.log(error);
    }
  }

  const filterArtworks = (filter) => {
    // console.log({ filter });
    if (filter === 'All') {
      setFilteredArtworks(null)
    } else {
      setFilteredArtworks([...artwork].filter(item => item.artworkType.includes(filter)))
    }
  }
  useEffect(() => {
    // console.log({ filteredArtworks });
  }, [filteredArtworks])

  const navigateToArtPreview = (item) => {
    try {
      navigation.navigate("ArtPreview", {
        artistUid: item.ArtistUid,
        artName: item.artName,
        imageUID: item.ImageUid,
        artUrl: item.artUrl,
        artistName: item.artistName,
        artType: item.artType,
        photoUrl: item.photoUrl
      })
    } catch (error) {
      Alert.alert('Error', error, [
        { text: 'Okay', onPress: () => { } }
      ])
    }

  }
  const getArtistDetails = async (artistId) => {
    // console.log({ artistId });
    return firestore.collection(ARTIST_COLLECTION).doc(artistId.trim()).get().then(doc => {
      // const { artistName, photoUrl } = doc.data()
      const artistName = doc.data().fullname
      const photoUrl = doc.data().imageUrl
      console.log({ artistName, photoUrl });
      
      // console.log('some artist details', { artistName, photoUrl });
      return { artistName, photoUrl }
    })
  }
  const getArtWorks = (enabledArtists) => {
    console.log({enabledArtists});
    
    return firestore.collection(ARTWORK_COLLECTION).where("isEnabled", "==", true).where('artistUid', 'in', enabledArtists).onSnapshot(async (snapShot) => {
      // console.log({ artworks: 'searching'});
      // console.log({ artworkSize: snapShot.size });
      
      if (!snapShot.empty) {
        // console.log('snapshot not empty');
        const art = await Promise.all(snapShot.docs.map(async (item) => ({
          ...item.data(),
          isArt: true,
          artUrl: item.data().imgUrls[0].imgUrl,
          ImageUid: item.id,
          artistUid: item.data().artistUid,
          artName: item.data().title,
          ...(await getArtistDetails(item.data().artistUid))
        })))
        // console.log({ art });
        setArtwork(art)
        // console.log('artworks: ', art);
        setTimeout(() => {
          toggleShowPlaceholder(false)
        }, 2400)
      } else {
        // console.log('snapshot empty');
      }

    })
  }

  useEffect(() => {
    let isMounted = true;
    // console.log('on market');
    if (isMounted) {
      firestore
        .collection(ARTWORK_COLLECTION)
        .where("status", "==", "approved")
        .orderBy("title", "desc")
        .onSnapshot((snapShot) => {
          if (!snapShot.empty) {
            const snap = snapShot.docs.map((document) => document.data());
            setData(snap);
          }

        });
      getArtist();
      // getArtWorks();
    }
    return () => isMounted = false
    // return () => getArtData();
  }, []);
  useEffect(() => {
    // console.log({ artwork: artwork[1] });
  }, [artwork])
  const getViewLayout = (layout) => {
    // console.log(layout);
    setViewHeight(layout.height)
  }
  const navigateToArtwork = async (item) => {
    // const artistUid = item.artistUid
    // console.log({ item });
    const { artistUid, artistName, photoUrl, imageUID } = item
    // console.log({ artistUid, artistName, photoUrl, imageUID });
    router.navigate({ pathname: '/artworks/[id]', params: {
      artistUid, imageUID, photoUrl, artistName, id: imageUID
    }})
  }

  return (
    <ScreenContainer>

      <TabContent>
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <MarketFlatlistView
            navigation={navigation}
            artworks={filteredArtworks || artwork}
            navigateToArtwork={(item) => navigateToArtwork(item)}
            onSortChange={(val) => sortArtworks(val)}
            onFilterChange={(val) => filterArtworks(val)}
          >
            <CreatorsSection
              artists={artist}
              onSortChange={(val) => { sortArtist(val) }}
              key="creators-section"
            />
          </MarketFlatlistView>
        </View>
      </TabContent>
    </ScreenContainer>
  )
}