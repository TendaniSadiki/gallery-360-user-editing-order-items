import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'

const ViewAll = ({ onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <Text style={styles.viewMoreText}>View All</Text>
        </Pressable>
    )
}

export default ViewAll

const styles = StyleSheet.create({
    viewMoreText: {
        color: '#CEB89E',
        padding: 10,
        fontSize: 12,
        textTransform: 'uppercase'
    }
})