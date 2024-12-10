import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'
import BoughtArtworksThumbnail from '../images/BoughtArtworksThumbnail'

const BoughtArtworksCard = ({ uri, name, onPress, artId }) => {
    return (
        <Pressable style={{}} onPress={onPress}>
            <BoughtArtworksThumbnail uri={uri} />
            <Text style={ styles.text }>{name}</Text>
        </Pressable>
    )
}

export default BoughtArtworksCard

const styles = StyleSheet.create({
    text: {
        color: "#151515",
        fontSize: 14,
        fontWeight: '500',
        // left: 10,
        margin: 10
    }
})