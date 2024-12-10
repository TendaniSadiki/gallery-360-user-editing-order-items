import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  // SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  ActivityIndicator,
  BackHandler,
  ScrollView,
} from "react-native";
// import Toast from "react-native-simple-toast";
//
import { auth, firestore } from "../../../../../services/firebase";
//
import { FontAwesome } from "@expo/vector-icons";
//
// import { Video, ResizeMode } from "expo-av";
// import VideoPlayer from "expo-video-player";
import { useHeaderHeight } from "@react-navigation/elements";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { globalStyles } from "../../../../assets/styles/GlobalStyles";
import BoughtArtworksSection from "../../../../../components/sections/BoughtArtworksSection";
import TransparentHeaderView from "../../../../../components/TransparentHeaderView";
import ArtistArtworks from "../../../../../components/sections/ArtistArtworks";
import ArtistProfileHeader from "../../../../../components/sections/ArtistProfileHeader";
// import { useNavigationState } from "@react-navigation/native";
import { UserContext, useSession } from "../../../../../providers/AuthProvider";
import { router, Stack, useLocalSearchParams } from "expo-router";
import ScreenContainer from "../../../../../components/containers/ScreenContainer";
import BackIcon from "../../../../../components/BackIcon";
import StackHeaderTitle from "../../../../../components/navigation/StackHeaderTitle";
import { Cart } from "../../../../../components/icons";
import HomeHeaderRight from "../../../../../components/HomeHeaderRight";
import { useCart } from "../../../../../providers/CartProvider";
import HeaderRightOptions from "../../../../../components/cards/HeaderRightOptions";
// import { ArtistDetailsModal } from "../components";
//
export default function ArtistProfileScreen({ }) {
  //
  const params = useLocalSearchParams()
  const { artistUid, photoUrl, artistName, description, fullname } = params
  console.log('params: ', params)
  //
  // console.log('on aartist screen');
  // const [uid, setUid] = useState(null)
  const scrollViewRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([])
  const [likes, setLikes] = useState([])
  const [userLikes, setUserLikes] = useState(false)
  const [following, setFollowing] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null)
  const [FullName, setFullName] = useState(null);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [art, setArt] = useState(null);
  const [boughtArtworks, setBoughtArtworks] = useState(null)
  const [size, setSize] = useState(0);
  const [isModalVisible, setModalIsVisible] = useState(true)
  const [videoViewSize, setVideoViewSize] = useState(100)
  const [scrollEnabled, setScrollEnabled] = useState(true)
  const video = useRef(null)
  const controlRef = useRef();
  const videoViewRef = useRef(null);
  const [status, setStatus] = React.useState({});
  const [filteredArtworks, setFilteredArtworks] = useState(null)
  const headerHeight = useHeaderHeight()
  // const routes = useNavigationState(state => state.routes)
  const { user: { uid, email } } = useSession()
  const { cartItem } = useCart()

  // console.log({ uid });  
  // console.log({ headerHeight });
  //  video

  const getArt = async () => {
    // console.log(`artist ID : ${artistUid}s`);
    // console.log({ artistUid });
    // console.log('hi there');
    // return  
    try {
      // console.log('running art getter');
      firestore
        .collection("Market")
        .where("userid", "==", artistUid.trim())
        .where("isEnabled", "==", true)
        .onSnapshot((snapShot) => {
          // console.log('got data');
          if (!snapShot.empty) {
            // console.log('snap not empty');
            let allArt = snapShot.docs.map((docSnap) => ({
              isArt: true,
              ...docSnap.data(),
              imageUid: docSnap.id
            }));
            // console.log('all art: ', allArt);
            // if (allArt.length > 0) {
            //   setArt([...allArt, { isArt: false, ImageUid: null }]);
            // }
            setArt(allArt)
          } else {
            // console.log('snap is empty');
          }


        });
    } catch (error) {

    }

  };
  useEffect(() => {
    // console.log(art);
    if (art) {
      // console.log(art.length);
    }

  }, [art])

  const getArtistData = () => {
    try {
      // console.log('fetching user data');
      // console.log('data: ', artistUid)
      firestore.collection('artists').doc(artistUid).onSnapshot(doc => {
        // console.log('data changed');
        if (doc.exists) {
          // console.log({ artistData: doc.data() });
          // console.log('data exists')
          const artistLikes = doc.data().likes
          // setNumberOfLikes(artistLikes.length || 0)
          setVideoUrl(doc.data().videoUrl)
          setLikes(artistLikes || [])
          setPhotoURL(doc.data().imageUrl)
          if (artistLikes && artistLikes.length > 0) {
            const liked = artistLikes.includes(uid)
            setUserLikes(liked)
          } else {
            setUserLikes(false)
          }
          setNumberOfComments(doc.data().numberOfComments || 0)
          // setVideoUrl(doc.data().introClip ? doc.data().introClip : 'no video')
          // setVideoUrl(doc.data().videoUrl)
          const followers = doc.data().followers
          // console.log({ followers, uid });
          const likeArr = doc.data().user

          if (followers && followers.length > 0) {
            let isFollowing = followers.includes(uid)
            // console.log({ isFollowing });
            setFollowers(followers)
            setIsFollowing(isFollowing)
          } else {
            // console.log('artist has no followers');
            setIsFollowing(false)
            // console.log({ follows: isFollowing});
          }
          if (likeArr && likeArr.length > 0) {
            let userLikes = likeArr.includes(uid)
            setLikes(likeArr)
            setUserLikes(true)
          }
        } else {
          // console.log('data does not exist')
        }
        // console.log(doc.data())
      })
    } catch (error) {
      // console.log({ error });
    }
  }
  useEffect(() => {
    // console.log('url: ', videoUrl)
  }, [videoUrl])
  const getNumberOfImage = () => {
    try {
      // console.log('artistUid: ', artistUid);
      firestore
        .collection("Market")
        .where("artistUid", "==", artistUid)
        .where("isEnabled", "==", true)
        .onSnapshot((snapShot) => {
          if (!snapShot.empty) {
            const artSizes = snapShot.size - 2;
            // console.log(artSizes, " the art size of the artist");
            setSize(artSizes);
          }
        });
    } catch (error) {
      // console.log({ error });
    }
  };

  const filterArtworks = (filter) => {
    try {
      // console.log({ filter });
      if (filter === 'All') {
        setFilteredArtworks(null)
      } else {
        setFilteredArtworks([...art].filter(item => item.artworkType.includes(filter)))
      }
    } catch (error) {
      // console.log({ error });
    }
  }
  const updateFollowing = () => {
    try {
      let followersArr = []
      // console.log({ uidInUpdate: uid });
      if (isFollowing) {
        followersArr = followers.filter(item => !item === uid)
      } else {
        if (followers.includes(uid)) { // just in place to force consistency between the different states, it hasn't been consistent
          followersArr = followers
        } else {
          followersArr = [...followers, uid]
        }
      }
      // console.log({ followersArr });
      setIsFollowing(followersArr.includes(uid))
      updateArtist({ followers: followersArr })
    } catch (error) {
      // console.log({ error });
    }
  }
  const updateLikes = () => {
    try {
      let likeArr = []
      if (userLikes) {
        // console.log({ current: likes });
        likeArr = likes.filter(item => !item === uid)
      } else {
        if (likes.includes(uid)) {
          likeArr = likes
        } else {
          likeArr = [...likes, uid]
        }
      }
      // console.log({ likeArr });
      setUserLikes(likeArr.includes(uid))
      updateArtist({ likes: likeArr })
    } catch (error) {
      // console.log({ error });
    }
  }
  const updateArtist = (obj) => {
    try {
      firestore.collection('artists').doc(artistUid).update(obj)
    } catch (error) {
      // console.log({ error });
    }

  }
  const getArtworksBought = async (docs) => {
    console.log({ docs });

    // const docPromise = new Promise()
    const promise = Promise.all(docs.map(async item => {
      console.log({ item });

      // console.log({ item: item.data()});
      const data = [item.id, { ...item.data(), artName: await getArtName(item.id) }]
      // console.log({ data });
      console.log({ data });

      return data
    }))
    promise.then(res => {
      console.log({ res });

    })
  }
  const getBoughtArtworks = () => {
    firestore.collectionGroup('orderItems').where('uid', '==', uid).where('artistUid', '==', artistUid).get().then(async result => {
      console.log({ size: result.size });

      if (result.size > 0) {
        const array = await getArtworksBought(result.docs)
        // console.log({ boughtArtworks: array});
        // setBoughtArtworks(array)
      }
    })
  }
  const getArtName = async (artUid) => {
    return firestore.collection('Market').doc(artUid).get().then(res => res.data().title)
  }
  useEffect(() => {
    let isMounted = true;
    // console.log('running on artist');
    if (isMounted) {
      // console.log('getting details');
      getArt();
      getNumberOfImage();
      getBoughtArtworks()
      // followState();
      getArtistData()
      // const ref = videoViewRef.current
      // console.log('ref: ', ref.contentSizeChange);
      // return () => followState();
      // return () => getArt();
      // return () => getNumberOfImage();
      setTimeout(() => {
        // console.log(VideoPlayer);
        // console.log(videoViewRef.current.playAsync())
      }, 3000)
    }
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
      isMounted = false
      BackHandler.removeEventListener('hardwareBackPress')
      // console.log(Video);
      // videoViewRef.current.pauseAsync()
    }
  }, []);
  useEffect(() => {
    // console.log(art);

  }, [art])
  // const handleScroll = (event) => {
  //   const { y } = event.nativeEvent.contentOffset;
  //   console.log({ y });
  //   const childComponentTop = 250 // calculate the child component's top position;

  //   // Adjust the threshold as needed
  //   const threshold = 10;

  //   const enable = (y <= childComponentTop + threshold);
  //   console.log({ enable });
  //   setScrollEnabled(enable)
  //   if(!enable) scrollViewRef.current.scrollTo({ y: 250, animated: false });
  // };

  // return (
  //  <TransparentHeaderView>
  //   <View>
  //     <Text>hi there</Text>
  //   </View>
  //  </TransparentHeaderView>
  // )
  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        headerTransparent: true,
        headerStyle: {
          height: 80,
          // backgroundColor: 'red'
        },
        headerBackVisible: false,
        headerLeft: (props) => (
          <BackIcon />
        ),
        headerTitle: () => (
          <StackHeaderTitle title={artistName || fullname} titleColor={"#22180E"} />
        ),
        headerRight: () => (
          <HeaderRightOptions cartItem={cartItem} />
        )
      }}

      />
      <ScreenContainer>
        <TransparentHeaderView style={{ paddingHorizontal: 0 }}>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
          // scrollEnabled={scrollEnabled}
          // onScroll={handleScroll}
          // ref={scrollViewRef}  
          >
            <ArtistProfileHeader
              artistUid={artistUid}
              photoUrl={photoURL}
              artistName={artistName || fullname}
              numberOfComments={numberOfComments}
              numberOfLikes={likes.length}
              isFollowing={isFollowing}
              updateFollowing={() => updateFollowing()}
              updateLikes={() => updateLikes()}
              userLikes={userLikes}
              navigator={{
                pathname: '/artists/[id]/biography', params: {
                  artistUid,
                  description: params.biography,
                  signature: params.signature,
                  videoUrl: videoUrl,
                  id: artistUid
                }
              }}
            />
            <BoughtArtworksSection
              artworks={boughtArtworks}
              onNavigate={(imageUID) => router.navigate({
                pathname: '/artworks/[id]',
                params: {
                  artistUid,
                  imageUID: imageUID,
                  photoUrl,
                  artistName: artistName || fullname,
                  id: imageUID
                }
              })}
            />

            <ArtistArtworks
              artworks={filteredArtworks || art}
              artistName={artistName || fullname}
              artistPic={photoUrl}
              onPress={(imageUID) => {
                // console.log({ artistUid, imageUID: imageUID, photoUrl, artistName });
                router.navigate({ pathname: '/artworks/[id]', params: { artistUid, imageUID: imageUID, photoUrl, artistName, id: imageUID } })
              }}
              onFilterChange={(val) => filterArtworks(val)} />


          </ScrollView>
        </TransparentHeaderView>
      </ScreenContainer>
    </>

  );
}


const statusBarHeight = StatusBar.currentHeight;
const paddingOnTop = Platform.OS === 'android' ? 60 : 60
// console.log({ paddingOnTop });
// console.log('here is the fact');
// console.log('bar height: ', statusBarHeight);
const styles = StyleSheet.create({
  container: {
    // height: "100%",
    flex: 1,
    width: "100%",
    // paddingTop: paddingOnTop,
    // backgroundColor: "red",
  },
  topLevelView: {
    flex: 1,
    // backgroundColor: 'red'
  },
  TopContainer: {
    // top: statusBarHeight ? statusBarHeight : 0,
    // paddingTop: paddingOnTop,
    flex: 1,
    top: 0,
    padding: 0,
    flex: 2,
    // borderColor: 'blue',
    // borderWidth: 5,
  },
  MiddleContainer: {
    flex: 2,
    marginVertical: 20, top: 0,
    // backgroundColor: "blue"
  },
  BottomContainer: {
    flex: 2,
    // top: 20,

    // backgroundColor: 'red',
    paddingBottom: 20
  },
  moreText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    top: 15,
  },
  noArtView: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    // alignContent: 'center'
  },
  noArtText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: 'bold',
    width: '60%',
    // height: ,
    textAlign: "center",
    justifyContent: 'center',
    // borderColor: 'black',
    // borderWidth: 1
  },
  img: {
    height: 150,
    width: 120,
    borderRadius: 15,
  },
  listItem2: {
    // paddingLeft: 15,
    paddingTop: 20,
    flexDirection: "column",
    marginHorizontal: 5,
    marginBottom: 45,
    // borderColor: 'yellow',
    // borderWidth: 1,
    flex: 1,
    height: '100%'
  },
  price: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  priceView: {
    backgroundColor: "rgba(16, 18, 27, 0.4)",
    marginVertical: -25,
    borderRadius: 20,
    alignSelf: "center",
    height: 20,
    width: "90%",
  },
  listItem: {
    // paddingTop: 20,
    // marginLeft: 15,
    paddingHorizontal: 20,
    width: "100%",
    // height: 100,
    flex: 2,
    // borderColor: 'blue',
    // borderWidth: 1
  },
  img2: {
    height: 50,
    width: 50,
    borderRadius: 25,
    // borderColor: 'rgba(196, 196, 196, 0.51)',
    // borderWidth: 4,
    marginLeft: 3,
  },
  BackButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 10,
  },
  Heart: {
    alignSelf: "flex-end",
    marginHorizontal: 160,
    bottom: 15,
  },
  VideoContainer: {
    borderRadius: 20,
    width: 325,
    height: 490,
    // backgroundColor: "blue",
    alignSelf: "center",
    // marginTop: -95,
  },
});
