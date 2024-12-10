import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type PriceItemProps = {
    label: string,
    price: Number
}
const PriceItem = ({ label, price }: PriceItemProps ) => {
    console.log({ price });
    
    return (
        <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>{label}</Text>
            <Text style={styles.price}>R{String(price)}</Text>
        </View>
    )
}

export default PriceItem

const styles = StyleSheet.create({
    priceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      priceLabel: {
        color: 'rgb(30, 30, 30)',
        fontSize: 12
      },
      price: {
        color: 'rgb(30, 30, 30)',
        fontSize: 12,
        fontWeight: '900'
      }
})