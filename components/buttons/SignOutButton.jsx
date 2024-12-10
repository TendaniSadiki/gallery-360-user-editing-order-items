import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useSession } from '../../providers/AuthProvider'

const SignOutButton = () => {
  const { logOut } = useSession()
    return (
        <Pressable style={{
          height: 50,
          width: 50,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 5
          // alignSelf: "center"
        }}
          onPress={logOut}
        >
          <FontAwesome name='sign-out' size={21} color='white'></FontAwesome>
          {/* <Image src={LogoutIcon} style={{height: 30, width: 30}}></Image> */}
        </Pressable>
      )
}

export default SignOutButton

const styles = StyleSheet.create({})