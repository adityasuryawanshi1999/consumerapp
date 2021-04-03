import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions, Button, Platform, Alert} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Google from 'expo-google-app-auth'
import Header from '../components/Header'
import QRCode from 'react-native-qrcode-svg'
import Card from '../components/Card'
import { ceil } from 'react-native-reanimated'
import { TextInput, TouchableOpacity, TouchableNativeFeedback, ScrollView } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'

const Three = props => {

    const name = props.navigation.getParam('name')
    const email = props.navigation.getParam('email')
    const token = props.navigation.getParam('token')
    const url = props.navigation.getParam('url')
    const [shopid, setShopid] = useState("")

    let TouchableCmp = Platform.OS === 'android' && Platform.Version>=21 ? TouchableNativeFeedback : TouchableOpacity


    const signOut = async(r) => {
        //console.log('entered')
        //console.log(r)
        const logoutResult = await Google.logOutAsync({ 
        accessToken:r, 
        iosClientId:"771336740186-p0vd3pn0b2foilc39iuruounvb06ciik.apps.googleusercontent.com", 
        androidClientId: "771336740186-50346pht0c5i1ma0k2ac8f0bbo65dbhd.apps.googleusercontent.com",
        //iosStandaloneAppClientId, 
        androidStandaloneAppClientId: "771336740186-idt6hmslj04ul37p4a623544m940trrn.apps.googleusercontent.com",
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

    const enroll = async() => {
      console.log("enroll started")
      fetch('https://rental-portal.000webhostapp.com/consumer/enrollcustomer.php', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
             
                // Getting the id.
                email: email,
                shopid: shopid
              }) 
              
            }).then((response) => response.json())
                  .then((responseJson) => {
                    console.log(responseJson)
                    if(responseJson===0){
                      Alert.alert("Already Enrolled", "The shop you're trying to enroll is already enrolled for your account.", [{text: "Okay", onPress: ()=> {} }])
                    }else{
                      props.navigation.navigate('Transactions')
                    }
                  }).catch((error) => {
                    console.log(error);
                  }); 
    }

    return(
        <ScrollView style={{flex: 1, backgroundColor: '#ccc'}}>
        <View style={{flex:1, alignItems: "center", justifyContent: "space-between", paddingBottom: 40, backgroundColor: '#ccc'}}>
            <Header />
            <View style={styles.qrcontainer}>
              <QRCode value={email} size={250} />
            </View>
            <Card style={styles.enrollContainer}>
              <Text style={{marginBottom: 2}}>Enter Shop ID you want to enroll for:</Text>
              <TextInput style={styles.text} value={shopid} onChangeText={ text => setShopid(text)} />
              <TouchableCmp onPress={enroll}>
                <View style={styles.enrollButton}>
                  <Text>Enroll</Text>
                </View>
              </TouchableCmp>
            </Card>
            <View style={styles.wrapper}>
              <TouchableCmp onPress={()=>signOut(token)}>
                <View style={styles.logoutButton}>
                  <Text>Logout</Text>
                </View>
              </TouchableCmp>
            </View>
            <Text style={{color: 'black', marginTop: 20}}>It was a pleasure having you, be back soon! :)</Text>
        </View>
        </ScrollView> 
    )
}

Three['navigationOptions'] = () => (
  { 
    headerShown: true
  }
)

const styles = StyleSheet.create({
  header: {
    height: Dimensions.get('screen').height*0.15
  },
  qrcontainer:{
    alignItems: "center",
    marginVertical: 10
  },
  enrollContainer:{
    marginTop: 20,
    alignItems: "center",
    width: Dimensions.get('screen').width*0.97,
    alignContent: "center",
  },
  text:{
    backgroundColor: '#ccc',
    width: Dimensions.get('window').width*0.80,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 5
  },
  enrollButton: {
    width: Dimensions.get('screen').width*0.5,
    backgroundColor: Colors.primary,
    height: 45,
    borderRadius: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    overflow: "hidden"
  },
  logoutButton:{
    width: Dimensions.get('screen').width*0.5,
    backgroundColor: 'red',
    height: 45,
    borderRadius: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    marginTop: 40
  }
})

export default Three