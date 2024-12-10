import { StyleSheet, Text, View, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import React from 'react'
import HeroCard from '../cards/HeroCard'
import FollowButton from '../buttons/FollowButton'
import MessageCounter from '../counters/MessageCounter'
import LikeCounter from '../counters/LikeCounter'
import HeroImage from '../images/HeroImage'
import { Link } from 'expo-router'

const ArtistProfileHeader = ({ navigator, artistUid, photoUrl, onImagePress, artistName, numberOfComments, numberOfLikes, isFollowing, updateFollowing, updateLikes, userLikes }) => {
  console.log({ artistUid, photoUrl, artistName });
  // const following = true;
  // const { }
  
  const img = "https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800"

  return (
    <View style={styles.container}>
      <Link asChild href={navigator}>
        <Pressable>
          <HeroImage uri={photoUrl ?? img} />
        </Pressable>
      </Link>

      <View style={styles.rightDetails}>
        <Text style={styles.artistName}>{artistName}</Text>
        <View style={styles.artistEngagement}>
          <FollowButton text={isFollowing ? "Following" : 'Follow'} isFollowing={isFollowing} updateFollowing={updateFollowing} />
          <MessageCounter counter={numberOfComments} />
          <LikeCounter counter={numberOfLikes} updateLikes={updateLikes} userLikes={userLikes} />
        </View>
      </View>
    </View>
  )
}

export default ArtistProfileHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 20,
    width: Dimensions.get('window').width,
    paddingHorizontal: 10
  },
  rightDetails: {
    flexDirection: 'column',
    flex: 1,
  },
  artistName: {
    fontSize: 34,
    fontWeight: '500'
  },
  artistEngagement: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  }
})