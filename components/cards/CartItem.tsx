import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { globalStyles } from "@/assets/styles/GlobalStyles";

type CartItemProps = {
    name: string,
    price: number,
    imageUrl: string,
    artId: string,
    item: object,
    artistUid: string,
    deleteCart: (artId: string, artistUid: string, price: number) => void
}

export const CartItem: React.FC<CartItemProps> = ({ name, price, imageUrl, artId, item, artistUid, deleteCart }: CartItemProps) => {
    // console.log({ name, price, imageUrl, artId, item });
    // console.log({ itemID: item.imageUid });
    // console.log({ artistUid });

    return (
        <View style={styles.flatlistView}>
            <View style={styles.cancelIcon}>
                <Pressable style={{ width: 37, height: 37, cursor: 'pointer' }} onPress={() => deleteCart(artId, artistUid, price)}>
                    <Ionicons
                        name="close-outline"
                        size={25}
                        color="#FFFFFF"
                        style={styles.closeIconStyle}
                    />
                </Pressable>
            </View>
            <Image source={{ uri: imageUrl }} style={styles.cartImage} />
            <View style={styles.priceContainer}>
                <Text numberOfLines={1} style={styles.artTxtName}>{name}</Text>
                <Text style={styles.priceTxt}>{`R${price.toFixed(2)}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    flatlistView: {
        // borderRadius: 10,
        //    backgroundColor: 'red',
        marginVertical: -15,
    },
    cancelIcon: {
        width: 37,
        height: 37,
        borderRadius: 18.5,
        backgroundColor: "#FF5353",
        position: "absolute",
        zIndex: 10,
        right: 18,
        top: 25,
        margin: 5
    },
    closeIconStyle: {
        textAlign: "center",
        top: 5,
        position: "relative",
    },
    cartImage: {
        width: "95%",
        height: 180,
        alignSelf: "center",
        borderRadius: 15,
        top: 20,
    },
    priceContainer: {
        flexDirection: "column",
        width: "90%",
        height: 70,
        borderRadius: 10,
        bottom: 57,
        backgroundColor: "rgba(16, 18, 27, 0.4)",
        alignSelf: "center",
    },
    artTxtName: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: "bold",
        marginHorizontal: 20,
        marginVertical: 10,
    },
    priceTxt: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "bold",
        marginHorizontal: 20,
        marginVertical: -10,
    },
})