import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StripeProvider } from '@stripe/stripe-react-native';
import { fetchKey } from '../services/stripe-requests';

const PaymentProvider = ({ children }) => {
    const [publishableKey, setPublishableKey] = useState('');

    const fetchPublishableKey = async () => {
        console.log('fetching key');
        const key = await fetchKey(); // fetch key from your server here
        console.log({ publishableKey: key });
        
        setPublishableKey(key);
    };

    useEffect(() => {
        fetchPublishableKey()
    }, [])

    return (
        <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="merchant.identifier" // required for Apple Pay
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirectsF
        >
            {children}
        </StripeProvider>
    )
}

export default PaymentProvider
const styles = StyleSheet.create({})