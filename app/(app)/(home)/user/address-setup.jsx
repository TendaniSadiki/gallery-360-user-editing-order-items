import { ActivityIndicator, Dimensions, Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { globalStyles } from '../../../../assets/styles/GlobalStyles';
import { ActionButton } from '../../../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserContext, useSession } from '../../../../providers/AuthProvider';
import { firestore } from '../../../../services/firebase';
import { Stack } from 'expo-router';
import BackIcon from '../../../../components/BackIcon';

const CustomTextInput = ({ onPress, onChangeText, value, style, placeholder, disabled, type = 'default' }) => {
    return (
        <TextInput
            style={styles.textInput}
            onChangeText={(ev) => onChangeText(ev)}
            value={value}
            underlineColorAndroid="#f000"
            placeholder={placeholder}
            placeholderTextColor="#000"
            autoCapitalize="sentences"
            disabled={disabled}
            keyboardType={type}
        />
    )
}

const AddressSetupScreen = ({ navigation }) => {
    const [showIndicator, setShowIndicator] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState()
    const [streetName, setStreetName] = useState()
    const [houseNumber, setHouseNumber] = useState()
    const [city, setCity] = useState()
    const [province, setProvince] = useState()
    const [country, setCountry] = useState()
    const [postalCode, setPostalCode] = useState()

    const [windowPadding, setWindowPadding] = useState(0)

    const insets = useSafeAreaInsets()

    const { user, toggleUserState } = useSession()
    // const padding 
    // console.log({ userState });
    // console.log({user});


    const calculatePadding = (height) => {
        // console.log({ height, windowHeight: Dimensions.get('window').height });

        if (height < Dimensions.get('window').height) {
            // console.log('scroll is smaller');
            const paddingTop = Dimensions.get('window').height - height
            // console.log({ paddingTop });

            setWindowPadding(paddingTop)
        }
    }
    const formValid = () => {
        if (!phoneNumber || !streetName || !houseNumber || !city || !province || !country || !postalCode) {
            return false
        }
        return true
    }
    const handleSubmit = async () => {
        setShowIndicator(true)
        if (formValid()) {
            const userAddress = {
                phoneNumber,
                streetName,
                houseNumber,
                city,
                province,
                country,
                postalCode
            }
            // console.log({
            //     userAddress
            // });
            // console.log({ uid: user.uid });

            // return
            const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${houseNumber} ${streetName}, ${city}, ${province}, ${country}&key=AIzaSyCprPVV3OJgeeEXYVZ0d3tyEK8QEAjVMpw`, {
                method: 'POST'
            })
            const data = (await result.json())
            const res = data.results[0]
            const coordinates = {
                lat: res.geometry.location.lat,
                lng: res.geometry.location.lng,
            }
            const countryCode = res.address_components[6].short_name
            const provinceCode = res.address_components[5].short_name
            firestore.collection('users').doc(user.uid).collection('addresses').add({
                ...userAddress,
                countryCode,
                provinceCode,
                coordinates,
                isDefault: true
            }).then(res => {
                firestore.collection('users').doc(user.uid).update({
                    physicalAddress: userAddress,
                    countryCode,
                    provinceCode,
                    coordinates,
                    profileSet: true
                })
                    .then(res => {
                        console.log({ res });
                        setShowIndicator(false)
                        toggleUserState(user.uid, { ...user }, true)
                    })
                    .catch(err => {
                        // console.log(err);
                        console.error({ err });

                        setShowIndicator(false)
                    })
            })

        } else {

        }


    }
    // paddingTop inserted because seems expo isn't calculating the status bar height
    return (
        <>
            <Stack.Screen options={{
                headerShown: true,
                headerTransparent: true,
                title: null,
                headerStyle: {
                    height: 80,
                    // backgroundColor: 'red'
                },
                headerBackVisible: false,
                headerLeft: (props) => (
                    <BackIcon />
                )
            }}
            />
            <View style={{ flex: 1, paddingTop: insets.top, zIndex: 0, justifyContent: 'flex-end' }}>
                <Image
                    source={require("../../../../assets/images/home.png")}
                    style={[{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, position: 'absolute', zIndex: -10, top: 0 }]}
                >
                </Image>
                <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', justifyContent: 'flex-end' }} behavior="height" enabled>
                    <ScrollView onContentSizeChange={(w, h) => calculatePadding(h)} contentContainerStyle={{ justifyContent: 'flex-end', flexGrow: 1 }}>
                        <View style={{ flex: 1, gap: 15, padding: 20, justifyContent: 'flex-end', bottom: 0 }}>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: 36, color: "#22180E" }}>Add Details</Text>
                                <Text style={{ fontSize: 18, color: "#000", fontWeight: '400' }}>Enter your physical address</Text>
                            </View>
                            <CustomTextInput
                                placeholder={'Phone Number'}
                                onChangeText={(ev) => setPhoneNumber(ev)}
                                // value={phoneNumber}
                                disabled={showIndicator}
                                type='phone-pad'
                            />
                            <CustomTextInput
                                onChangeText={(ev) => setHouseNumber(ev)}
                                placeholder={'House Number'}
                                disabled={showIndicator}
                                // value={houseNumber}
                                type={'phone-pad'}
                            />

                            <CustomTextInput
                                onChangeText={(ev) => setStreetName(ev)}
                                placeholder={'Street Name'}
                                disabled={showIndicator}
                                // value={streetName}
                                autoCapitalize="sentences"
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                onChangeText={(ev) => setCity(ev)}
                                placeholder={'City / Town'}
                                disabled={showIndicator}
                                // value={city}
                                autoCapitalize="sentences"
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                onChangeText={(ev) => setProvince(ev)}
                                placeholder={'Province'}
                                disabled={showIndicator}
                                // value={province}
                                autoCapitalize="sentences"
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                onChangeText={(ev) => setCountry(ev)}
                                placeholder={'Country'}
                                disabled={showIndicator}
                                // value={country}
                                autoCapitalize="sentences"
                                keyboardType={'default'}
                            />
                            <CustomTextInput
                                onChangeText={(ev) => setPostalCode(ev)}
                                placeholder={'Postal Code'}
                                disabled={showIndicator}
                                // value={postalCode}
                                autoCapitalize="sentences"
                                type={'phone-pad'}
                            />
                            <ActionButton
                                style={{ marginTop: 10 }}
                                text={'Save Address'}
                                disabled={showIndicator}
                                isLoading={showIndicator}
                                onPress={handleSubmit}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </>

    )
}

export default AddressSetupScreen

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        borderColor: 'rgb(0,0,0)',
        borderRadius: 15,
        borderWidth: 1,
        padding: 10,
        paddingLeft: 20,
        color: 'rgb(0,0,0)'
    }
})