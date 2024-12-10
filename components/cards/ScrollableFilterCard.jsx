import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import FilterText from '../text/FilterText'

const ScrollableFilterCard = ({ padding, onFilterChange }) => {
    // padding prop allows for resizing the scrollview to always take full width regardless of the container width
    // just calculate the space between the element and the screen margin

    const [active, setActive] = useState('All')
    // const active = 'All'
    const filters = [
        'All',
        'Painting',
        'Drawing',
        'Sculpture',
        'Printmaking',
        'Statues',
        'Fine Art',
        'Statues',
        'Fine Art'
    ]
    const captureChange = (text) => {
        // console.log({ text });
        // console.log({ onFilterChange });
        if (onFilterChange) {
            // console.log(onFilterChange);
            onFilterChange(text)
        } else {
            // console.log('onfilterchange not defined');
        }
    }
    return (
        <View style={[styles.container]}>
            <ScrollView
                contentContainerStyle={[
                    styles.scrollView,
                    // padding && { marginHorizontal: padding,  }
                ]}
                style={{ borderRadius: 0 }}
                horizontal={true}
                overScrollMode="always"
                showsHorizontalScrollIndicator={false}
            >
                {/* <View> */}
                    <View style={{ ...styles.scrollable, ...styles.containerShadow }}>
                        {
                            filters.map((item, index) => {
                                return (
                                    <FilterText
                                        key={index}
                                        active={active === item}
                                        text={item}
                                        setActive={(text) => {
                                            setActive(text);
                                            captureChange(text)
                                        }}
                                    />

                                )
                            })
                        }
                    </View>
                {/* </View> */}


            </ScrollView>
        </View>
    )
}

export default ScrollableFilterCard

const styles = StyleSheet.create({
    container: {
        // flex: 0,
        alignItems: 'flex-start',
        // borderRadius: 20,
        // overflow: 'hidden',
        // backgroundColor: 'red',
        flexDirection: 'row',
        width: Dimensions.get('window').width + 10,
        marginVertical: 5,
        paddingRight: 10,
        zIndex: 10
        // paddingHorizontal: 30,
        // left: -30
    },
    containerShadow: {
        // backgroundColor: 'red',
        shadowColor: 'rgb(120, 120, 120)',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 4
    },
    scrollView: {
        // flex: 1,
        // width: Dimensions.get('window').width, 
        flexDirection: 'row',
        // backgroundColor: 'yellow',
        paddingVertical: 5,

        // borderRadius: 20,
        // marginHorizontal: 30,
        // paddingHorizontal: 30, // this works when nested inside another container. 
        // overflow: 'visible',
    },
    scrollable: {

        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        // marginHorizontal: 1,
        // marginRight: 2
    }
})