import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { DropdownInput } from '../inputs'
import HeroCard from '../cards/HeroCard'
import { useRouter } from 'expo-router'

const CreatorsSection = ({ artists, onSortChange }) => {
  // console.log({ artists });
  const router = useRouter()
  const artist = [1, 2, 3, 4, 5, 6, 7]
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Creators</Text>
        <DropdownInput onChange={onSortChange} />
      </View>
      <ScrollView
        contentContainerStyle={styles.artists}
        style={{ zIndex: -2 }}
        scrollEnabled
        horizontal
      >
        {
          artists.map(item => {
            // console.log({ key: item.artistUid });
            // return <HeroCard key={item.artistUid} name={item.fullname} pic={item.imageUrl} uid={item.artistUid} onPress={(artistUid) => router.navigate({ pathname: 'buggy' })} />

            return <HeroCard key={item.artistUid} name={item.fullname} pic={item.imageUrl} uid={item.artistUid} onPress={(artistUid) => router.navigate({ pathname: 'artists/[id]', params: { ...item, id: artistUid, photoUrl: item.imageUrl }})} />
          })
        }
      </ScrollView>
    </View>
  )
}

export default CreatorsSection

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    width: Dimensions.get('window').width,
    padding: 10,
    zIndex: 0
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    zIndex: -1
  },
  header: {
    fontSize: 20,
    fontWeight: '300'
  },
  artists: {
    // flexDirection: 'row',
    gap: 10,
    zIndex: 1,
    minHeight: 82,
    minHeight: 96 // find out why min height is 96, text height seems to play a role
  }
})