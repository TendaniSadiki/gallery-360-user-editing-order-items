import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'

type PropType = {
    children: React.ReactNode
}
const ScreenContainer = ({ children }: PropType) => {
  const insets: EdgeInsets = useSafeAreaInsets()
  return (
    <ImageBackground
        source={require('@/assets/images/home.png')}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height + insets.top
        }}
    >
        { children }
    </ImageBackground>
  )
}

export default ScreenContainer

const styles = StyleSheet.create({})