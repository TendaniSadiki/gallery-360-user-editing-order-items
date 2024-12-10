import { StyleSheet, Text, View, ScrollView, Image, Dimensions, ImageBackground, TouchableOpacity, AppState, Pressable } from 'react-native'
import React from 'react'
import TransparentHeaderView from '../../../../../components/TransparentHeaderView';
import { ResizeMode, Video } from 'expo-av';
import { useRef, useState } from 'react';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { TimeComponent } from '../../../../../components';
import { Stack, useLocalSearchParams } from 'expo-router';
import ScreenContainer from '../../../../../components/containers/ScreenContainer';
import BackIcon from '../../../../../components/BackIcon';
import StackHeaderTitle from '../../../../../components/navigation/StackHeaderTitle';

const ArtistBiographyScreen = ({ }) => {
    const { signature, videoUrl, description, artistName = "Vee" } = useLocalSearchParams()
    const videoRef = useRef()
    const [videoStyle, setVideoStyle] = useState(null)
    const [useNativeControls, setNativeControls] = useState(false)
    const [shouldPlay, setShouldPlay] = useState(false)
    const [videoLength, setVideoLength] = useState(0)
    const makeVideoFullScreen = async () => {
        await videoRef.current?.presentFullscreenPlayer()
    }
    useEffect(() => {
        if (videoRef.current) {
            // console.log({ video: videoRef.current });
        }
    }, [videoRef])
    const onFullscreenUpdate = (event) => {
        // console.log({ event });
        const { fullscreenUpdate, status } = event
        // console.log({ fullscreenUpdate, status });
        if (fullscreenUpdate === 1) {
            setNativeControls(true)
        }
        if (fullscreenUpdate === 2) {
            setNativeControls(false)
        }
    }

    useEffect(() => {
        // AppState.addEventListener('change', handleAppStateChange);
        // return () => AppState.removeEventListener('change', handleAppStateChange);
    }, [])

    const handleAppStateChange = (nextAppState) => {
        // Perform audio-related operations based on app state
        if (nextAppState === 'active') {
            // App is in the foreground
            // Resume or start audio playback
            // console.log('active');
        } else {
            // App is in the background
            // Pause or stop audio playback
            // console.log('inactive');
        }
    };
    const handlePlaybackStatusUpdate = (status) => {
        // console.log('button pressed');
        // console.log({ status });
        if (!videoLength || videoLength == 0) {
            setVideoLength(status.durationMillis / 1000)
        } else {
            // console.log({ videoLength });
        }

    }
    useEffect(() => {
        // console.log({ videoStyle });
    }, [videoStyle])
    return (
        <>
            <Stack.Screen options={{
                headerShown: true,
                headerTransparent: true,
                headerStyle: {
                    height: 80,
                    // backgroundColor: 'red'
                },
                headerBackVisible: false,
                headerLeft: (props) => (
                    <BackIcon />
                ),
                headerTitle: () => (
                    <StackHeaderTitle title={'Biography'} titleColor={"#22180E"} />
                ),
            }}

            />
            <ScreenContainer>
                <TransparentHeaderView style={{ paddingHorizontal: 0 }}>
                    <ScrollView>
                        <View style={styles.scrollView}>
                            <View style={{ width: '100%', height: 300, marginBottom: 20 }}>
                                {
                                    ((videoUrl && videoUrl) !== 'no video') &&
                                    <Video
                                        ref={videoRef}
                                        style={[{ width: "100%", height: 300, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }, videoStyle && videoStyle]}
                                        source={{
                                            uri: videoUrl,
                                        }}
                                        // useNativeControls
                                        useNativeControls={useNativeControls}
                                        resizeMode={ResizeMode.COVER}
                                        isLooping
                                        shouldPlay={shouldPlay}
                                        onFullscreenUpdate={onFullscreenUpdate}
                                        onPlaybackStatusUpdate={status => handlePlaybackStatusUpdate(status)}
                                    />
                                }
                                <View style={{ position: "absolute", height: 300, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Pressable onPress={() => { makeVideoFullScreen() }} style={{
                                        position: 'absolute', borderColor: '#FFF', borderWidth: 1, borderRadius: 20, height: 50, width: 50, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Ionicons name={'play'} color={'white'} size={28} />
                                    </Pressable>
                                </View>

                                <View style={styles.videoTextOuterCont}>
                                    <BlurView intensity={80} tint={'light'} style={styles.videoTextInnerCont}>
                                        <Text>{artistName}</Text>
                                        <TimeComponent seconds={videoLength} />
                                    </BlurView>

                                </View>

                            </View>

                            <Image source={{ uri: signature }} style={{ width: "60%", aspectRatio: 1 }} />
                            <Text style={{ color: 'rgb(100, 100, 100)' }}>authenticity</Text>
                            <Text style={{ marginTop: 20 }}>{description}</Text>
                        </View>




                    </ScrollView>
                </TransparentHeaderView>
            </ScreenContainer>
        </>



    )
}

export default ArtistBiographyScreen

const styles = StyleSheet.create({
    container: {
        // height: "100%",
        flex: 1,
        width: "100%",
        // paddingTop: paddingOnTop,
        // backgroundColor: "red",
    },
    scrollView: {
        flex: 1,
        // height: 100,
        padding: 20,
        alignItems: 'center',
        // backgroundColor: 'red',
        marginTop: 'auto',
        paddingTop: 20,
        // borderColor: 'black',
        // borderWidth: 3
    },
    videoTextOuterCont: {
        position: 'absolute',
        width: '100%',
        bottom: 10,

        paddingHorizontal: 10,
        alignSelf: 'center'
    },
    videoTextInnerCont: {
        width: '100%',
        // backgroundColor: 'black',
        // backgroundColor: 'rgba(150,150,150, 0.9)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 20,
        overflow: 'hidden'
    }
})