import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from '@react-navigation/elements';

type TabContentProps = {
  children: ReactNode
}

const TabContent = ({ children }: TabContentProps) => {
    const insets = useSafeAreaInsets()
    const headerHeight = useHeaderHeight()
    console.log({ headerHeight, insets });
    
  return (
    <View style={{ ...styles.container, top: insets.top, paddingTop: headerHeight + 42, }}>
      <View style={styles.innerContainer}>
        { children }
      </View>
    </View>
  )
}



export default TabContent

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    // borderColor: 'red',
    // borderWidth: 3
  },
  innerContainer: {
    flex: 1,
    // borderColor: 'green',
    // borderWidth: 3
  }
})