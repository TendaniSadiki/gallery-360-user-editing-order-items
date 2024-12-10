import { StyleSheet} from 'react-native'
import React from 'react'
import Swiper from "react-native-swiper";
import ExhibitionCard from '../cards/ExhibitionCard';
import { Timestamp } from 'firebase/firestore';

interface ExhibitionDetails {
  exhibitionUid: string,
  imgUrl: string,
  date: {
    fromDate: string,
    toDate: string
  },
  timeStamp?: Timestamp,
  address: string,
  artistUid: string,
  contactNumber?: string,
  desc: string,
  email: string,
  imgUrls: Array<{
    default: boolean,
    imgUrl: string
  }>,
  isEnabled: boolean,
  name: string,
  time: {
    fromTime: string,
    toTime: string
  }
}

/**
 * Type of object expected as props 
 * 
 * @type
 */
type SwiperProps = {
  exhibitions: Array<{
    exhibitionUid: string,
    imgUrl: string,
    date: {
      fromDate: string,
      toDate: string
    },
    timeStamp?: Timestamp,
    address: string,
    artistUid: string,
    contactNumber?: string,
    desc: string,
    email: string,
    imgUrls: Array<{
      default: boolean,
      imgUrl: string
    }>,
    isEnabled: boolean,
    name: string,
    time: {
      fromTime: string,
      toTime: string
    }
  }>;
}

const ExhibitionSwiper = ({ exhibitions}: SwiperProps) => {
  console.log({ exhibitions});  
  return (
    <Swiper style={{ borderRadius: 20, overflow: 'hidden' }} showsPagination={false} showsButtons >
    {
      exhibitions.length > 0 && exhibitions.map(item => {
        // console.log({ item });
        return (
            <ExhibitionCard key={item.exhibitionUid} item={item} />
        )
      })
    }
  </Swiper>
  )
}

export default ExhibitionSwiper