import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const PaymentSuccessful = ({ size }) => {
    return (
        <Image resizeMode='contain' style={[{ width: 242.71 / 1.5, height: 242.71 / 1.5 }]} source={require('../../assets/images/payment-successful.png')} />
    )
}

export default PaymentSuccessful

const styles = StyleSheet.create({})