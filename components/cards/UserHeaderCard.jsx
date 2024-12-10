import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'
import HeroImage from '../images/HeroImage'
import { useRouter } from 'expo-router'

const UserHeaderCard = ({ userDetails, cartItem }) => {
    // console.log({ userDetails });
    // console.log({ navigationInHeader: navigation });
    const router = useRouter()
    return (
        <Pressable
            style={{
                // backgroundColor: 'red',
                height: 70
            }}
            onPress={() => {
                // console.log({ navigation });
                router.navigate('user/profile', {
                    photoURL: userDetails.photoUrl,
                    fullName: userDetails.fullName,
                    uuid: userDetails.userId,
                    cartItem: cartItem,
                })
            }

            }>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, height: 70 }}>
                <HeroImage
                    uri={userDetails.photoUrl}
                    size={50}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Hi, {userDetails.fullName ?? 'User'}
                </Text>
            </View>
        </Pressable>

    )
}

export default UserHeaderCard

const styles = StyleSheet.create({})