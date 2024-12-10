import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TransparentHeaderView = ({ children, padding, style, paddingTop }) => {
    // console.log({ paddingInSafe: padding });
    // const headerHeight = useHeaderHeight()
    const insets = useSafeAreaInsets()
    // console.log({ headerHeight, insets });
    // console.log({ children });
    // console.log({ headerHeight });
    // console.log({ insets, headerHeight });
    
    return (
        <View style={[styles.container, { paddingTop: paddingTop ?? 70, top: insets.top }]}>
            <View style={[ styles.safeArea, padding !== null && { padding }, style !== null && {...style} ]}>
                { children ? children : (
                    <Text>NO DATA</Text>
                ) }
            </View>
        </View>
    )
}

export default TransparentHeaderView

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        // borderColor: 'green',
        // borderWidth: 3
    },
    safeArea: {
        flex: 1,
        padding: 10,
        // borderColor: 'blue',
        // borderWidth: 3
    }
})