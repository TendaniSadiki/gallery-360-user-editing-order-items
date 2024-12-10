import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native';

const ArtworkImageSlider = ({ imagesArr }) => {
    // console.log({ images: imagesArr[0] });
    // console.log({ imagesArr });
    useEffect(() => {
        // setImages(imagesArr.map(item => item.imgUrl))
        console.log({ imagesArr });
    }, [imagesArr])
    // const images = [
    //     "https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800",
    //     "https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800",
    //     "https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800",
    //     "https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800"
    // ]
    return (
        <View style={{ left: 0, top: 0, backgroundColor: 'blue' }}>
            {
                imagesArr && (
                    <Image
                        resizeMode='cover'
                        source={{ uri: imagesArr[0] }}
                        style={styles.image}
                    />
                )
            }

            {/* <Text>Hi there</Text> */}
        </View>
    )
}

export default ArtworkImageSlider

const styles = StyleSheet.create({
    image: {
        height: 400,
        width: Dimensions.get('window').width
    }
})