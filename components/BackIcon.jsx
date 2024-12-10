import { FontAwesome } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import React from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Back } from './icons';
import { useRouter } from 'expo-router';

export default function BackIcon({ }) {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => {
                    if(router.canGoBack()) {
                        console.log('can');
                        router.back()
                    } else {
                        console.log('cant');
                        router.navigate('/')
                    }
                }}
                style={styles.pressable}
            >
                {/* <FontAwesome name="chevron-left" size={ 25 } color="white" /> */}
                <Back size={25} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        justifyContent: 'center',
    },
    pressable: {
        height: 50,
        width: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
