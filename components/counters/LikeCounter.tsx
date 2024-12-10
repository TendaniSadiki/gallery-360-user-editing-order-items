import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CounterComponent from './CounterComponent'
import { Heart } from '../icons'

type LikeCounterProps = {
    counter: number,
    updateLikes: () => void,
    userLikes: number
}
const LikeCounter = ({ counter, updateLikes, userLikes }: LikeCounterProps) => {
    return (
        <CounterComponent
            image={ <Heart size={ 24 } userLikes={userLikes} /> }
            counter={counter}
            onPress={updateLikes}
        />
      )
}

export default LikeCounter

const styles = StyleSheet.create({})