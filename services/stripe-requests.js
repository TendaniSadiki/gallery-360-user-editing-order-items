import { initPaymentSheet } from "@stripe/stripe-react-native";
const ipAddress = '10.50.85.12'
// const API_URL = `http://${ipAddress}:8000/payments`
// const API_URL = 'https://g360-server-qea1zttvy-mlab-vees-projects.vercel.app/payments'
const API_URL = 'https://g360-server.onrender.com/payments'

export const fetchKey = async () => {
    console.log('fetching key from server');
    // const ipAddress = '10.50.85.11'
    // const site = `http://${ipAddress}:8000`
    try {
        const result = await fetch(API_URL + '/pk-key')
        const data = await result.json()
        console.log({ data });
        const key = data.publishableKey
        console.log({ key });
        return key
    } catch (error) {
        console.log(error);
    }
}
export const fetchPaymentSheetParams = async (grandTotal) => {
    console.log('fetching params');
    console.log(grandTotal);
    
    
    
    // console.log({ totale: Number(subTotal) + (Number(deliveryTotal)) ?? 0});

    // return
    
    const response = await fetch(`${API_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "total": grandTotal
        })
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    console.log({ paymentIntent, ephemeralKey, customer });

    return {
        paymentIntent,
        ephemeralKey,
        customer,
    };
};

export const initializeSheet = (userDetails, paymentIntent, ephemeralKey, customer) => {
    return initPaymentSheet({
        merchantDisplayName: "Gallery 360 Africa",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        shipping: {
            name: userDetails.fullName,
            address: {
                line1: `${userDetails.physicalAddress.houseNumber} ${userDetails.physicalAddress.streetName}`,
                city: userDetails.physicalAddress.city,
                postal_code: userDetails.physicalAddress.postalCode,
                state: userDetails.physicalAddress.provinceCode,
                country: userDetails.physicalAddress.countryCode,
            }
        },
        defaultBillingDetails: {
            name: userDetails.fullName,
            address: {
                line1: `${userDetails.physicalAddress.houseNumber} ${userDetails.physicalAddress.streetName}`,
                city: userDetails.physicalAddress.city,
                postal_code: userDetails.physicalAddress.postalCode,
                state: userDetails.physicalAddress.provinceCode,
                country: userDetails.physicalAddress.countryCode,
            }

        }
    });
}
export const fetchSecretKey = async () => {
    const result = await fetch(`${API_URL}/secret-key`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await result.json()
    return data.secretKey
}