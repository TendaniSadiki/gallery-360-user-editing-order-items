import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'

const FilterText = ({ active, text, setActive }) => {
  return (
    <Pressable style={ [styles.opacity, active && { backgroundColor: '#CEB89E'} ]} onPress={() => setActive(text)}>
        <Text style={styles.text}>{text.trim()}</Text>
    </Pressable>
  )
}

export default FilterText

const styles = StyleSheet.create({
    opacity: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        // backgroundColor: 'red',
        borderRadius: 20,
        letterSpacing: 3,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    text: {
        // letterSpacing: 1,
        fontSize: 13,
        fontWeight: '600'
    }
})