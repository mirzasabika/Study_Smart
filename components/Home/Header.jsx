import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { UserDetailContext } from './../../context/UserDetailContext'

export default function Header() {
    const {userDetails,setUserDetails} = useContext (UserDetailContext)
  return (
    <View>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize:25
      }}>
        Hello, {userDetails?.name}
    </Text>Aq13wSZ

    </View>
  )
}