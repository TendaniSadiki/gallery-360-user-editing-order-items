import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const AuthLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='sign-up' options={{
                headerShown: false
            }} />
            <Stack.Screen name='sign-in' options={{
                headerShown: false
            }} />
            <Stack.Screen name='forgot-password' />
        </Stack>

    )
}

export default AuthLayout

const styles = StyleSheet.create({})