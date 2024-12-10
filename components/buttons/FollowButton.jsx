import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Person } from '../icons';

const FollowButton = ({ text, onPress, icon, secondary, isFollowing, updateFollowing }) => {
    // console.log({ secondary });
    // console.log({ follows: isFollowing });
    const containerStyle = [
        styles.container,
        !isFollowing && { backgroundColor: "#FFFFFF", borderColor: "#EDEDED", borderWidth: 1 }
    ]
    const textStyle = [
        styles.text,
        !isFollowing && { color: "#000000" }
    ]

    return (
        <View style={{ alignItems: 'flex-start' }}>
            <Pressable style={[containerStyle, styles.containerShadow]} onPress={updateFollowing}>
                {!isFollowing && <Person size={18} /> }
                    <Text style={textStyle}>{text}</Text>
            </Pressable>
        </View>
    )
}

export default FollowButton

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        // paddingVertical: 5,
        borderRadius: 20,
        backgroundColor: '#181818',
        height: 25,
        // width: 100,

        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        // flex: 1,
        gap: 5
    },
    containerShadow: {
        // backgroundColor: 'red',
        shadowColor: 'rgb(120, 120, 120)',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 4
    },
    icon: {
        height: 15,
        width: 15,
        // backgroundColor: 'red'
    },
    text: {
        color: "#CEB89E",
        fontSize: 10,
        textTransform: "uppercase",
        fontWeight: '300',
        // flex: 1,
        // backgroundColor: 'red'
    }
})