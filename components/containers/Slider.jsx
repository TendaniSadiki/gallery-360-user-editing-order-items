
import { StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import LoaderImage from '../LoaderImage';

const Slider = ({ contentContainerStyle, data, paginatorStyle }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    console.log({ data });
    // console.log({Image});
    const img = 'https://firebasestorage.googleapis.com/v0/b/gallery-360-africa.appspot.com/o/Artworks%2F1729185563906?alt=media&token=212c7dc9-1ba3-4958-a9a1-355b3fcccff1'
    const Slid = () => <Image style={{ "borderBottomLeftRadius": 20, "borderBottomRightRadius": 20, "flex": 1, "height": "100%", "justifyContent": "center", "width": "100%" }} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/gallery-360-africa.appspot.com/o/Artworks%2F1701424180058?alt=media&token=230ff691-d984-4bc5-b078-dec8cd993fe6" }} />
    // console.log(Slid);
    const link = "https://firebasestorage.googleapis.com/v0/b/gallery-360-africa.appspot.com/o/Artworks%2F1701424180058?alt=media&token=230ff691-d984-4bc5-b078-dec8cd993fe6"
    handleViewItemsChange = (data) => {
        // console.log({ shownData: data });
    }
    const onViewableItemsChanged = ({
        viewableItems,
    }) => {
        // Do stuff
        // console.log({ viewableItems });
        const index = viewableItems[0].index
        // console.log({ index });
        setActiveIndex(index)
    };
    const viewabilityConfigCallbackPairs = useRef([
        { onViewableItemsChanged },
    ]);
    return (
        <View style={[styles.container, contentContainerStyle]}>
            <FlatList
                horizontal
                data={data}
                keyExtractor={(item, index) => index}
                snapToAlignment={"start"}
                decelerationRate={"fast"}
                snapToInterval={Dimensions.get('window').width}
                viewabilityConfigCallbackPairs={
                    viewabilityConfigCallbackPairs.current
                }

                renderItem={({ item }) => {
                    // return <Image source={{ uri: img }} style={styles.image}/>
                    return <LoaderImage
                        key={item.imgUrl}
                        uri={item.imgUrl}
                        style={styles.image}
                        indicatorPadding={120}
                    />
                }}
            />
            <View style={{ ...styles.paginatorCount, ...paginatorStyle }}>
                {
                    data?.map((item, index) => {
                        return <View style={[styles.inactiveIndex, activeIndex === index && { backgroundColor: '#FFF' }]} />
                    })
                }
            </View>
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'red',
        overflow: 'hidden',
        alignItems: 'center'
    },
    paginatorCount: {
        position: 'absolute',
        padding: 4,
        borderRadius: 4,
        // width: 100,
        // height: 100,
        // zIndex: 10,
        // elevation: 10,
        bottom: 90,
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.55)',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
    },
    inactiveIndex: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        width: 5,
        height: 20,
        borderRadius: 5
    },
    image: {
        flex: 1,
        justifyContent: "center",
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: 500,
        width: Dimensions.get('window').width, aspectRatio: 0.7,
        zIndex: 20
    },
})