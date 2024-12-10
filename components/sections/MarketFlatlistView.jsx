import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { DropdownInput } from '../inputs'
import ScrollableFilterCard from '../cards/ScrollableFilterCard'
// import { FlatList } from 'react-native-web'
import ArtworkCard from '../cards/ArtworkCard'
// const arr = [1, 2, 3, 1+1 === 2 ? 5 : (...[5,3,5])]
// console.log({ arr });
const MarketFlatlistView = ({ artworks, navigateToArtwork, onSortChange, onFilterChange, children }) => {
    // console.log({ artworks });
    // console.log({ navigateToArtwork });
    // console.log({ artworksInSection: artworks });
    const arr = [1, 2, 3, 4, 5]
    const ArtworkHeader = () => {
        return (
            <View style={{ width: styles.container.width }}>
                <View style={{ ...styles.header, paddingHorizontal: 10}}>
                    <Text style={styles.headerText}>Artworks</Text>
                    <DropdownInput onChange={onSortChange} />
                </View>
                <ScrollableFilterCard padding={10} onFilterChange={onFilterChange} />
            </View>
        )
    }
    const renderHeader = ArtworkHeader()
    const NoArtworkText = () => {
        return (
            <View style={styles.noArtworksTextCont}>
                {/* <Text> */}
                    <Text style={styles.noArtworksText}>No artworks</Text>
                {/* </Text> */}

            </View>
        )
    }
    const renderNoArtworkText = NoArtworkText()
    const getData = () => {
        let flatlistItems = [
            { key: 'artist-section', view: children },
            { key: 'artwork-header', view: renderHeader },
            ...artworks
        ]
        if (artworks.length === 0) {
            flatlistItems.push({ key: 'no-artwork-text', view: renderNoArtworkText })
        }
        // flatlistItems.push({ key: 'no-artwork-text', view: renderNoArtworkText })

        return flatlistItems
    }
    // console.log({ data: getData() });
    return (
        <View style={styles.container}>
            <FlatList
                style={{ zIndex: 0, flex: 1, display: 'flex', flexDirection: 'column' }}
                scrollEnabled
                data={getData()}
                renderItem={({ item }) => {
                    
                    if (item.ImageUid) {
                        
                        return <ArtworkCard artDetails={item} navigateToArtwork={navigateToArtwork} />
                    } else {
                        return item.view
                    }
                }}
                keyExtractor={item => {
                    if (item.ImageUid) {
                        return item.ImageUid
                    } else {
                        // console.log({ item });
                        // console.log(item.key );
                        return item.key
                    }

                }}
            />
        </View>
    )
}

export default MarketFlatlistView

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flex: 1,
        zIndex: 0,
        elevation: 0,
        // padding: 10,
        // overflow: 'visible',
        // borderColor: 'black',
        // borderWidth: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 34,
        lineHeight: 34,
        // backgroundColor: 'red'
    },
    noArtworksTextCont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
        zIndex: -10,
        elevation: 0,
        // backgroundColor: 'red'
        width: Dimensions.get('window').width
    },
    noArtworksText: {
        fontSize: 24,
        lineHeight: 24 * 2,
        fontWeight: '700',
        alignSelf: 'stretch',
        textAlign: 'center',
        // padding: 10,
        // backgroundColor: 'blue',
        // width: 'fit-content',
        // minWidth: '',
        // display: 'inline'
        // artWorks section on home landing page
    }

})