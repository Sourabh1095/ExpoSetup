import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useDispatch } from "react-redux";

import { loggedState } from "../../../redux/slices/isLogged";
import { clearCatFav } from '../../../redux/slices/catFav';

export default function Profile() {
  const dispatch = useDispatch();

  const logout=async()=>{
    dispatch(clearCatFav())
    dispatch(loggedState(false))
  }
  return (
    <View style={{marginTop:100}}>
      <Text>Profile</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({})