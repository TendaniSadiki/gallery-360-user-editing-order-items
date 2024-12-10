import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const PaymentUnsuccessful = () => {
    return (
        <Image resizeMode='contain' style={[{ width: 242.71 / 1.5, height: 242.71 / 1.5 }]} source={require('../../assets/images/payment-unsuccessful.png')} />
    )
}

export default PaymentUnsuccessful

const styles = StyleSheet.create({})