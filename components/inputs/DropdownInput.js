import { StyleSheet, Text, View, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
// import {  } from 'react-native-web'
import { ArrowDown } from '../icons'
import { Ionicons } from '@expo/vector-icons'

const DropdownInput = ({ onChange }) => {
    const [sortBy, setSortBy] = useState({
        name: 'new',
        text: 'New To Old'
    })
    const options = [
        { name: 'new', text: 'New To Old' }, // By timeStamp, recent
        { name: 'old', text: 'Old To New' }, // By timeStamp, first added
        { name: 'a-z', text: 'A - Z' },      // By name (title), ascending
        { name: 'z-a', text: 'Z - A' }       // By name, descending
    ]
    const [showOptions, toggleShowOptions] = useState(false)
    const updateState = (item) => {
        setSortBy(item)
        toggleShowOptions(state => !state)
    }
    return (
        <View style={styles.container}>
            <Pressable style={styles.touchable} onPress={() => toggleShowOptions(state => !state)}>
                <Text style={{ zIndex: 0 }}>{sortBy.text}</Text>
                <ArrowDown size={24} rotate={showOptions} />
            </Pressable>
            <Modal
                visible={showOptions}
                onDismiss={() => { toggleShowOptions(false)}}
                onRequestClose={() => { toggleShowOptions(false) }}
                animationType="fade"
                style={{ backgroundColor: 'red' }}
                transparent={true}
            >
                <Pressable onPress={() => toggleShowOptions(false) } style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'flex-end' }}>
                    <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#fff', padding: 20 }}>
                        {/* <Text>Hi</Text> */}
                        <View style={{ alignItems: 'flex-end' }}>
                            <Pressable onPress={() => toggleShowOptions(false)}>
                                <Ionicons name='close' size={24} color="black" />
                            </Pressable>

                        </View>
                        {
                            options.map((item, index) => {
                                const disabled = item.name === sortBy.name
                                // console.log({ ropDown: item.name });
                                return <View key={item.name}>
                                    <Pressable key={item.name} style={[ styles.optionOpacity, { flexDirection: 'row', gap: 10 }]} disabled={disabled} onPress={() => { updateState(item); onChange(item.name) }}>
                                        <View style={{ borderWidth: 2, borderColor: styles.line.borderColor, width: 20, height: 20, borderRadius: 10, padding: 2 }}>
                                            { disabled && <View style={{ flex: 1, alignSelf: 'stretch', backgroundColor: styles.line.borderColor, borderRadius: 8 }} /> }
                                        </View>
                                        <Text style={[styles.optionText, disabled && { color: 'rgb(80, 80, 80)' }]}>{item.text}</Text>
                                    </Pressable>
                                    {
                                        index !== options.length - 1 && (
                                            <View style={styles.line} key={`${item.name}-separator`} />
                                        )
                                    }
                                </View>
                            })
                        }
                    </View>
                </Pressable>


            </Modal>
        </View>
    )
}

export default DropdownInput

const styles = StyleSheet.create({
    container: {
        zIndex: -10,
        // backgroundColor: 'yellow'
    },
    touchable: {
        flexDirection: 'row',
        gap: 10,
        // backgroundColor: 'red',
        alignItems: 'center',
        marginVertical: 5,
        zIndex: -1
    },
    text: {
        fontSize: 12,
        color: '#000000'
    },
    listContainer: {
        // overflow: 'scroll',
        // backgroundColor: 'red',
        // flex: 0
        zIndex: 10
    },
    list: {
        position: 'absolute',
        zIndex: 100,
        elevation: 100,
        // marginTop: 'auto',
        right: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        // gap: 5,
        minWidth: 150
    },
    optionOpacity: {
        paddingVertical: 10
    },
    optionText: {

    },
    line: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#CEB89E'
    }
})