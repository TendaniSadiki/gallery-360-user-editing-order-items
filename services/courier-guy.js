const COURIER_GUY_API = 'https://api.shiplogic.com/v2'
const COURIER_GUY_KEY = '7aad3ef6bded48e0805d24f8ef3e9566'

export const createShipment = async (shipmentDetails, userDetails, orderID, parcels) => {
    // console.log({ address, artistDetails });
    const newDate = new Date()
    const date = newDate.getDate()
    const month = newDate.getMonth() + 1 > 9 ? "" + newDate.getMonth() + 1 : '0' + newDate.getMonth() + 1
    const year = newDate.getFullYear()
    const hour = newDate.getHours()
    console.log(shipmentDetails.shipmentDetails.service_level.collection_date);
    console.log(shipmentDetails.shipmentDetails.service_level.delivery_date_from);
    // return
    try {
        const result = await fetch(`${COURIER_GUY_API}/shipments`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${COURIER_GUY_KEY}`
            },
            body: JSON.stringify({
                "collection_address": {
                    "street_address": shipmentDetails.collection_address.street,
                    "city": shipmentDetails.collection_address.city,
                    "code": shipmentDetails.collection_address.code,
                    "zone": shipmentDetails.collection_address.zone ?? shipmentDetails.collection_address.zone,
                    "country": shipmentDetails.collection_address.countryCode ?? "ZA",
                    "lat": shipmentDetails.collection_address.coords.lat,
                    "lng": shipmentDetails.collection_address.coords.lng
                },
                "collection_contact": {
                    "name": shipmentDetails.artistName ?? '',
                    "mobile_number": shipmentDetails.contactNumber,
                    "email": ""
                },
                "delivery_address": {
                    "street_address": `${userDetails.physicalAddress.houseNumber} ${userDetails.physicalAddress.streetName}`,
                    "city": userDetails.physicalAddress.city,
                    "code": userDetails.physicalAddress.postalCode,
                    "zone": userDetails.physicalAddress.province,
                    "country": userDetails.physicalAddress.countryCode,
                    "lat": userDetails.physicalAddress.lat,
                    "lng": userDetails.physicalAddress.lng
                },
                "delivery_contact": {
                    "name": userDetails.fullName,
                    "mobile_number": userDetails.physicalAddress.phoneNumber,
                    "email": userDetails.email
                },
                "parcels": parcels.map(item => {
                    return {
                        "parcel_description": item.description ?? '',
                        "submitted_length_cm": item.length ?? 20,
                        "submitted_width_cm": item.width ?? 20,
                        "submitted_height_cm": item.height ?? 10,
                        "submitted_weight_kg": item.weight ?? 3
                    }
                }),
                "opt_in_rates": [],
                "opt_in_time_based_rates": [
                ],
                "special_instructions_collection": "This is a test shipment - DO NOT COLLECT",
                "special_instructions_delivery": "This is a test shipment - DO NOT DELIVER",
                "declared_value": 0,
                "collection_min_date": new Date(shipmentDetails.shipmentDetails.service_level.collection_date).toISOString() ?? `${year}-${month}-${hour < 15 ? date : date + 1}T08:00:00.000Z`,
                "collection_after": "08:00",
                "collection_before": "16:00",
                "delivery_min_date": new Date(shipmentDetails.shipmentDetails.service_level.delivery_date_from).toISOString() ?? `${year}-${month}-${hour < 15 ? date : date + 1}T10:00:00.000Z`,
                "delivery_after": "10:00",
                "delivery_before": "17:00",
                "custom_tracking_reference": "",
                "customer_reference": orderID,
                "service_level_code": shipmentDetails.shipmentDetails.service_level.code ?? 'LSF',
                "mute_notifications": false
            })
        })
        const data = await result.json()
        // console.log({ data });
        return data
    } catch (error) {
        console.error(error)
    }
}
export const getParcelDeliveryPrice = async (artistDetails, userDetails, parcels) => {
    try {
        const body = {
            "type": "",
            "company": "",
            "street_address": artistDetails.collection_address.street_collection_address ?? artistDetails.collection_address.street,
            "local_area": artistDetails.collection_address?.local_area ?? '',
            "city": artistDetails.collection_address.city,
            "zone": artistDetails.collection_address.zone ?? artistDetails.collection_address.province,
            "country": artistDetails.collection_address.countryCode ?? "ZA",
            "code": artistDetails.collection_address.code ?? artistDetails.collection_address.postalCode,
            "lat": artistDetails.collection_address.coords.lat ?? artistDetails.collection_address.lat,
            "lng": artistDetails.collection_address.coords.lng ?? artistDetails.collection_address.lng
        }
        console.log(body);

        const result = await fetch(`${COURIER_GUY_API}/rates`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${COURIER_GUY_KEY}`
            },
            body: JSON.stringify({
                "collection_address": {
                    "type": "",
                    "company": "",
                    "street_address": artistDetails.collection_address.street_address ?? artistDetails.collection_address.street,
                    "local_area": artistDetails.collection_address?.local_area ?? '',
                    "city": artistDetails.collection_address.city,
                    "zone": artistDetails.collection_address.zone ?? artistDetails.collection_address.province,
                    "country": artistDetails.collection_address.countryCode ?? "ZA",
                    "code": artistDetails.collection_address.code ?? artistDetails.collection_address.postalCode,
                    "lat": artistDetails.collection_address.coords.lat ?? artistDetails.collection_address.lat,
                    "lng": artistDetails.collection_address.coords.lng ?? artistDetails.collection_address.lng
                },
                "delivery_address": {
                    "type": "residential",
                    "company": "",
                    "street_address": userDetails.physicalAddress.houseNumber + ' ' + userDetails.physicalAddress.streetName,
                    "local_area": userDetails.physicalAddress.localArea ?? '',
                    "city": userDetails.physicalAddress.city,
                    "zone": userDetails.physicalAddress.province,
                    "country": "ZA",
                    "code": userDetails.physicalAddress?.postalCode,
                    "lat": userDetails.physicalAddress.lat,
                    "lng": userDetails.physicalAddress.lng
                },
                "parcels": parcels.map(item => ({
                    "parcel_description": item.description ?? '',
                    "submitted_length_cm": item.length ?? 20,
                    "submitted_width_cm": item.width ?? 20,
                    "submitted_height_cm": item.height ?? 10,
                    "submitted_weight_kg": item.weight ?? 3
                })),
                "declared_value": 0,
                "collection_min_date": "2021-05-21",
                "delivery_min_date": "2021-05-21"
            })
        })
        const ratesBody = await result.json()
        console.log('getting rates');
        console.log(ratesBody);

        return { data: ratesBody, artistUid: artistDetails.artistUid }
    } catch (error) {
        console.log({ error });
        return null
    }

}
export const getItemDeliveryPrice = async (artistDetails, userDetails,) => {
    console.log({ url: `${COURIER_GUY_API}/rates/opt-in` });
    console.log(artistDetails.address.coords);
    console.log(userDetails.physicalAddress.lat);
    console.log('getting price');

    // return 500
    try {
        return fetch(`${COURIER_GUY_API}/rates/opt-in`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${COURIER_GUY_KEY}`
            },
            body: JSON.stringify({
                "collection_address": {
                    "lat": artistDetails.address.coords.lat,
                    "lng": artistDetails.address.coords.lng
                },
                "delivery_address": {
                    "lat": userDetails.physicalAddress.lat,
                    "lng": userDetails.physicalAddress.lng
                }
            })

        }).then(res => {
            console.log('res ', res);

            return res.json()
        }).then(data => {
            return { data, artistUid: artistDetails.artistUid }
        })
        // const data = await result.json()
        // console.log(data);

        // const deliveryPrice = data.opt_in_rates[0].charge_value
        // console.log({ deliveryPrice });

        // return deliveryPrice
    } catch (error) {
        console.error(error)
    }
}