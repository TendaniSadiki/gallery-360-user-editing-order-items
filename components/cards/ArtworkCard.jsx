import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import ArtistLabel from '../labels/ArtistLabel';
import LoaderImage from '../LoaderImage';
import { router } from 'expo-router';
// import LinearGradient from 'react-native-linear-gradient';
const imgSrc = "https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800"

const ArtworkCard = ({ artDetails, navigateToArtwork }) => {
    return (
        <Pressable style={styles.container} onPress={() => {
            router.navigate({
                pathname: '/artworks/[id]', params: {
                    artistUid: artDetails.artistUid,
                    imageUID: artDetails.ImageUid,
                    artistName: artDetails.artistName,
                    id: artDetails.ImageUid
                }
            })
        }}>
            <View style={styles.backgroundContainer}>
                <LoaderImage style={styles.image} mode={'cover'} uri={artDetails.imgUrls[0].imgUrl} />
                {/* <Image style={styles.image} resizeMode={"cover"} src={artDetails.artUrl}>


                </Image> */}
                <View style={styles.blurViewContainer}>
                    <BlurView
                        intensity={90}
                        style={styles.blurView}
                        experimentalBlurMethod='dimezisBlurView'
                    >
                        <View style={styles.artHeader}>
                            <Text style={styles.artName}>{artDetails.artName}</Text>
                            <Text style={styles.postedDate}>{'Yesterday'}</Text>
                        </View>
                        <View style={styles.artSubtitles}>
                            <Text style={styles.counterText}>{artDetails?.likes?.length ?? 0} LIKES</Text>
                            <Text style={styles.counterText}>{artDetails?.views ?? 0} VIEWS</Text>
                            <Text style={styles.artPrice}>R{artDetails.price}.00</Text>
                        </View>
                        <Text numberOfLines={2} style={{ fontSize: 14 }}>{String(artDetails.statement) || 'N/A'}</Text>
                        <ArtistLabel name={artDetails.artistName} uri={artDetails.photoUrl} />

                    </BlurView>
                </View>
            </View>
        </Pressable>
    )
}

export default ArtworkCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 324,
        padding: 10,
        borderRadius: 20,
        overflow: 'hidden',
        zIndex: 0
        // backgroundColor: 'red'
    },
    backgroundContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        width: '100%',
        flex: 1,
        // backgroundColor: 'blue'
    },
    image: {
        height: 148,
        resizeMode: 'cover',
        flexDirection: 'row'
    },
    blurViewContainer: {
        top: -20,
        height: 176,
        width: '100%',
        alignSelf: 'flex-end',
        borderRadius: 20,
        gap: 10
        // backgroundColor: 'red'
    },
    blurView: {
        flex: 1,
        padding: 10,
        gap: 15
    },
    artHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red'
    },
    artName: {
        fontSize: 14,
        color: '#151515',
        fontWeight: '500'
    },
    postedDate: {
        fontSize: 12,
        color: '#151515'
    },
    artSubtitles: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        // backgroundColor: 'red',
        marginTop: 15
    },
    counterText: {
        fontSize: 10,
        color: '#151515',
        // letterSpacing: -0.5
    },
    artPrice: {
        // alignSelf: 'flex-end',
        // backgroundColor: 'green',
        fontSize: 16,
        letterSpacing: -0.9,
        fontWeight: '500',
        marginLeft: 'auto'
    }
})


// This is the artwork card for the home page, the one with the blurry text background