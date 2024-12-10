import { StyleSheet, Text, View, Image, Pressable, ImageComponent } from 'react-native'
import React, { ReactNode } from 'react'


type CounterComponentProps = {
  image: ReactNode,
  counter: number,
  onPress: () => void,
  size?: string | number
}
const CounterComponent = ({ image, counter, onPress, size }: CounterComponentProps) => {
  // console.log({ counter });
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        { image as any }
      </Pressable>
      <Text style={styles.counter}>{counter}</Text>
    </View>
  )
}

export default CounterComponent

const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 5
  },
  image: {
    height: 24,
    width: 24
  },
  counter: {
    color: "#000000",
    fontSize: 11
  }
})