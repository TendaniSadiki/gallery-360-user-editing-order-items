import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StackHeaderTitle = ({ title, titleColor }) => {
    return (
        <View
            style={{
                height: 30,
                borderRadius: 14,
                alignSelf: "center",
                left: 20
            }}
        >
            <Text
                style={{
                    color: titleColor,
                    fontWeight: 900,
                    fontSize: 18,
                    alignSelf: "center",
                    marginVertical: 3,
                }}
            >
                { title }
            </Text>
        </View>
    )
}

export default StackHeaderTitle

const styles = StyleSheet.create({})