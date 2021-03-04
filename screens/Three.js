import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions, Button } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Google from 'expo-google-app-auth'

const Three = props => {

    const name = props.navigation.getParam('name')
    const email = props.navigation.getParam('email')
    const token = props.navigation.getParam('token')
    const url = props.navigation.getParam('url')

    const signOut = async(r) => {
        //console.log('entered')
        //console.log(r)
        const logoutResult = await Google.logOutAsync({ 
        accessToken:r, 
        iosClientId:"771336740186-p0vd3pn0b2foilc39iuruounvb06ciik.apps.googleusercontent.com", 
        androidClientId: "771336740186-50346pht0c5i1ma0k2ac8f0bbo65dbhd.apps.googleusercontent.com",
        //iosStandaloneAppClientId, 
        androidStandaloneAppClientId: "771336740186-50346pht0c5i1ma0k2ac8f0bbo65dbhd.apps.googleusercontent.com",
        })

        const n = null;

        try {
            await AsyncStorage.setItem('status','f');
            await AsyncStorage.setItem('name','f');
            await AsyncStorage.setItem('email','f'); 
            await AsyncStorage.setItem('url','f'); 
            await AsyncStorage.setItem('token','f');  
            //setLoading(false)  
          } catch (error) {
            // Error saving data
            console.log(error)
          }

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
              routeName: 'Login',
            })],
            });
        props.navigation.dispatch(resetAction)
        
    }

    return(
        <View>
            <Text>Hi</Text>
            <Button title="Logout" onPress={()=>signOut(token)} />
        </View>
    )
}

export default Three