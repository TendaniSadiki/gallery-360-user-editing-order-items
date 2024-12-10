import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const useAlert = () => {
    const showAlert = (title, message) => {
        Alert.alert(title, message, [
            { text: 'Okay' }
        ])
    }
  return showAlert
}

export default useAlert

const styles = StyleSheet.create({})