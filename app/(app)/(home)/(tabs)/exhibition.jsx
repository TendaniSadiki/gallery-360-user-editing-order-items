import {
  View,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import { firestore } from "../../../../services/firebase";
import ArtistScrollView from "../../../../components/ArtistScrollView";
import { ExhibitionSwiper, TabContent } from "../../../../components";

import { getDate } from "../../../../utils/helper-functions";
import ScreenContainer from "../../../../components/containers/ScreenContainer";
//
const SLIDER_WIDTH = Dimensions.get("window").width;

const screenHeight = Dimensions.get('window').height
export default function ExhibitionScreen() {
  //
  const [artist, setArtist] = useState(null);
  const [exhibition, setExhibition] = useState([]);
  const [viewHeight, setViewHeight] = useState(screenHeight)
  //
  const getArtist = () => {
    return firestore
      .collection("artists")
      .orderBy("timeStamp", "desc")
      .where("isEnabled", "==", true)
      .limit(3)
      .onSnapshot((snapShot) => {
        const allArtists = snapShot.docs.map((docSnap) => ({ ...docSnap.data(), artistUid: docSnap.id }));
        setArtist(allArtists);
      });
  };

  //
  const getExhibition = () => {
    return firestore.collection("exhibition").onSnapshot((snapShot) => {
      const allExhibitions = snapShot.docs.map(docSnap => ({
        ...docSnap.data(),
        isExhibition: true,
        exhibitionUid: docSnap.id,
        imgUrl: docSnap.data().imgUrls[0].imgUrl,
        date: {
          fromDate: getDate(docSnap.data().date.fromDate),
          toDate: getDate(docSnap.data().date.toDate)
        },

      }));
      console.log({ allExhibitions });
      
      setExhibition(allExhibitions);
    });
  };

  useEffect(() => {
    getExhibition();
    getArtist();
  }, []);
  useEffect(() => {
    // console.log({ viewHeight });
  }, [viewHeight])
  //

  const getViewLayout = (event) => {
    // console.log({ event: event.nativeEvent });
    setViewHeight(event.nativeEvent.height)
  };

  //
  return (
    <ScreenContainer>
      <TabContent>
        <View style={{ flex: 1, paddingVertical: 15 }}>
          <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}
            onLayout={(event) => getViewLayout(event)}>
            <ExhibitionSwiper exhibition={exhibition} />
          </View>
        </View>
        {/* <ArtistScrollView artist={artist} SLIDER_WIDTH={SLIDER_WIDTH} /> */}
      </TabContent>
    </ScreenContainer>

  );
}