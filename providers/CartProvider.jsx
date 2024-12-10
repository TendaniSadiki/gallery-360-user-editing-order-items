import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { firestore } from '../services/firebase'
import { useSession } from './AuthProvider'


export const CartContext = createContext({
  cartItem: 0,
  updateCart: () => { }
})

export const useCart = () => {
  const value = useContext(CartContext)
  return value
}

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState()
  const { user: { uid } } = useSession()
  const updateCart = () => {

    firestore
      .collection("cartItem")
      .doc(uid)
      .collection("items")
      .onSnapshot((snapShot) => {
        const cartItems = snapShot.size;
        // console.log({ cartItems });
        setCart(cartItems);
      }, (err) => {
        if (err.message === 'Failed to get document because the client is offline.') {
          console.log(err.message);
        }
      });
  }

  return (
    <CartContext.Provider value={{ cartItem: cart, updateCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider