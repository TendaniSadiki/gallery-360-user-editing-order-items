import { Dimensions, StyleSheet, Text, View, StatusBar, ScrollView, Image, Pressable, Share, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import BackIcon from '../../../components/BackIcon';
import StackHeaderTitle from '../../../components/navigation/StackHeaderTitle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TransparentHeaderView from '../../../components/TransparentHeaderView';
import { BlurView } from 'expo-blur';
import { firestore } from '../../../services/firebase';
import LoaderImage from '../../../components/LoaderImage';
import { Slider } from '../../../components';
import { getDate } from '../../../utils/helper-functions';
import { Entypo } from '@expo/vector-icons';
import { arrayUnion, arrayRemove } from 'firebase/firestore';
const LocationIcon = require('../../../assets/images/location.png')

const Buggy = () => {
    console.log('in exh');
    const params = useLocalSearchParams()
    const { id } = params
    const insets = useSafeAreaInsets()
    const [exhibitionDetails, setExhibitionDetails] = useState(null);
    const [isActive, setActive] = useState(false);
    console.log(insets);
    const barHeight = (Dimensions.get('screen').height - insets.top) - Dimensions.get('window').height

    console.log({
        window: Dimensions.get('window').height,
        screen: Dimensions.get('screen').height - insets.top - barHeight
    });


    useEffect(() => {
        StatusBar.setBackgroundColor('transparent')

        getExhibitionDetails()
    }, [])

    const getExhibitionDetails = () => {
        console.log({ id: params.id });
        try {
            firestore
                .collection("exhibition")
                .doc(id).onSnapshot(snapShot => {
                    if (snapShot.exists) {
                        const data = snapShot.data()
                        console.log(data);

                        const id = snapShot.id
                        setExhibitionDetails({ ...data, id })
                    }
                })
        } catch (error) {
            console.log(error);

        }
    }
    const getLocation = async () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${-25.7431479} + ${28.2877637}&dir_action=navigate`;
        Linking.openURL(url);
    }

    const onLikePress = () => {
        try {
            firestore
                .collection("exhibition")
                .doc(id).update({
                    likes: arrayUnion(id)
                })
        } catch (error) {
            console.log(error);

        }

        // props.sendNotification(user.notificationToken, "New Like", `${props.currentUser.name} liked your post`, { type: 0, postId, user: firebase.auth().currentUser.uid })
    };

    const onDislikePress = () => {
        try {
            firestore
                .collection("exhibition")
                .doc(id).update({
                    likes: arrayRemove(id)
                })
        } catch (error) {
            console.log(error);

        }

    };
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `There is an exciting art exhibition showcasing at ${exhibitionDetails?.address}.\n\nFrom: ${getFromDate()},\nUntil: ${getToDate()}.`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const getFromDate = () => {
        const { date, month, year } = getDate(exhibitionDetails?.date.fromDate)
        return `${date} ${month} ${year}`
    }
    const getToDate = () => {
        const { date, month, year } = getDate(exhibitionDetails?.date.toDate)
        return `${date} ${month} ${year}`
    }
    const renderView = () => {
        if (exhibitionDetails?.imgUrls?.length > 0) {
            return exhibitionDetails?.imgUrls?.map((item, index) => (
                <LoaderImage key={index} uri={item.imgUrl} style={styles.image} indicatorPadding={120} />
            ))
        }
    }

    return (
        <>
            <Stack.Screen options={{
                headerShown: true,
                headerTransparent: true,
                headerStyle: {
                    // height: 80,
                    // backgroundColor: 'red'
                },
                headerBackVisible: false,
                headerLeft: (props) => (
                    <BackIcon />
                ),
                headerTitle: () => (
                    <StackHeaderTitle title={'Exhibition'} titleColor={"#22180E"} />
                ),
            }}

            />

            <View style={{ ...styles.container, paddingBottom: insets.bottom }}>
                <View style={styles.imageContainer}>
                    <Slider
                        contentContainerStyle={styles.sliderContainer}
                        paginatorStyle={{ bottom: 105 }}
                        data={exhibitionDetails?.imgUrls}
                    />
                </View>
                <View style={{ ...styles.transparentContainer, bottom: barHeight }}>
                    <View style={styles.contentContainer}>
                        <BlurView
                            intensity={80}
                            tint='light'
                            style={{
                                width: Dimensions.get('window').width - 40,
                                flex: 1,
                            }}
                            experimentalBlurMethod='dimezisBlurView'
                        >
                            <ScrollView
                                scrollEnabled
                                contentContainerStyle={{}}>

                                <View style={{ margin: 10, marginBottom: 90 }}>
                                    <Text
                                        style={{
                                            color: "#000000",
                                            paddingBottom: 10,
                                            fontSize: 25,
                                            fontWeight: "bold",
                                            alignSelf: "center",
                                        }}
                                    >
                                        {exhibitionDetails?.name}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#000000",
                                            paddingBottom: 15,
                                            fontSize: 14,
                                            alignSelf: "flex-start",
                                        }}
                                    >
                                        {getFromDate()} - {getToDate()}

                                    </Text>
                                    <View style={{ maxHeight: 60, flexDirection: 'row', gap: 5, marginBottom: 10 }}>
                                        <Image source={LocationIcon} style={{ width: 40, height: 40, alignSelf: 'center' }} />
                                        <Text
                                            numberOfLines={2}
                                            style={{
                                                color: "#000000",
                                                // paddingBottom: 15,
                                                // padding: 2,
                                                flex: 1,
                                                marginLeft: 10,
                                                fontSize: 14,
                                                alignSelf: "center",
                                                // backgroundColor: 'red'
                                            }}
                                        >
                                            {exhibitionDetails?.address}
                                        </Text>
                                    </View>

                                    <Text
                                        style={{
                                            color: "#000000",
                                            paddingBottom: 20,
                                            fontSize: 14,
                                            width: "100%",
                                            // borderColor: 'red',
                                            // borderWidth: 1,
                                            alignSelf: "center",
                                        }}
                                    >
                                        {exhibitionDetails?.desc}
                                    </Text>

                                </View>
                            </ScrollView>



                            <View style={{ position: 'absolute', bottom: 10, width: '100%', paddingHorizontal: 0, alignSelf: 'center' }}>
                                <BlurView intensity={60} style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', bottom: 0, borderRadius: 30, overflow: 'hidden', paddingRight: 10 }}>
                                    <Pressable
                                        style={styles.visitLocation}
                                        onPress={() => getLocation()}
                                    >
                                        <Text style={styles.visitLocationtxt}>Visit Location</Text>
                                    </Pressable>

                                    <Pressable
                                        style={styles.Heart}
                                        onPress={() =>
                                            onShare()
                                        }
                                    >
                                        <Entypo name="share" size={30} color={"#000000"} />
                                    </Pressable>
                                    {exhibitionDetails?.likes?.includes(id) === true ? (
                                        <View style={styles.Heart}>
                                            <Entypo
                                                name="heart"
                                                size={30}
                                                color="red"
                                                onPress={() => onDislikePress()}
                                            />
                                        </View>
                                    ) : (
                                        <View style={styles.Heart}>
                                            <Entypo
                                                name="heart"
                                                size={30}
                                                color="#000000"
                                                onPress={() => onLikePress()}
                                            />
                                        </View>
                                    )}
                                </BlurView>
                            </View>
                        </BlurView>
                    </View>
                </View>
            </View>
        </>

    )
}

export default Buggy

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('screen').height,
        // backgroundColor: 'red',
        flexDirection: 'row'
    },
    imageContainer: {
        height: Dimensions.get('screen').height / 1.8,
        width: Dimensions.get('window').width,
        position: 'absolute',
        top: 0,
        left: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: 'green',
        zIndex: -1,
        overflow: 'hidden'
    },
    sliderContainer: {
        backgroundColor: 'blue',
        // borderColor: 'yellow',
        // borderWidth: 2,
        zIndex: 1,
    },
    transparentContainer: {
        position: 'absolute',
        bottom: 0,
        height: Dimensions.get('window').height / 1.8,
        width: Dimensions.get('window').width,
        // backgroundColor: 'blue',
        alignSelf: 'flex-end',
        // borderColor: 'yellow',
        // borderWidth: 2,
        alignItems: 'center'
    },
    contentContainer: {
        width: Dimensions.get('window').width - 40,
        flex: 1,
        // backgroundColor: 'yellow',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: 'hidden'
    },
    Heart: {
        alignSelf: "flex-end",
        marginHorizontal: 10,
        marginVertical: 16,
    },
    visitLocation: {
        backgroundColor: "#000000",
        justifyContent: "center",
        borderRadius: 20,
        alignSelf: "center",
        height: 50,
        width: 178,
        marginLeft: 8,
        marginVertical: 8,
      },
      visitLocationtxt: {
        textAlign: "center",
        fontSize: 14,
        color: "#ffffff",
      },
})