import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions, Button, ScrollView, Image, ActivityIndicator, FlatList } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ShopChoice from '../components/ShopsChoice'
import ShopsChoice from '../components/ShopsChoice'

const Transactions = props => {

    var email = ""
    var url = ""
    var token = ""
    var name = ""
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const [noResults, setNoResults] = useState(false)
    const [dataSource, setDataSource] = useState({data:[]})

    useEffect(()=>{
      (async()=>{
        console.log("1st started")
        try {
          email = await AsyncStorage.getItem('email');
          name = await AsyncStorage.getItem('name');
          token = await AsyncStorage.getItem('token');
          url = await AsyncStorage.getItem('url');

        } catch (error) {
          // Error retrieving data
          console.log(error)
        }

        //from here
        //console.log("2nd started") 
        //console.log(email)
        fetch('https://rental-portal.000webhostapp.com/consumer/getenrolledshops.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
               
                  // Getting the id. 
                  email: email
               
                })  
                
              }).then((response) => response.json())
                    .then((responseJson) => { 
                      if(responseJson===0){
                        setNoResults(true)
                        setLoading(false)
                        setUserData({name: name, url: url, email: email, token: token})
                      }
                      else{
                      setDataSource({ data: responseJson})
                      setLoading(false)
                      //console.log(responseJson)
                      setNoResults(false)
                      setUserData({name: name, url: url, email: email, token: token})
                      //console.log(dataSource)
                      }
                    }).catch((error) => {
                      console.error(error);
                      setLoading(false)
                      setNoResults(true)
                    }); 

      })();

    },[])

    if(loading){
      return(
        <View style={{justifyContent:"center", alignItems: "center",alignContent:"center", flex:1, backgroundColor: '#ccc'}}>
          <ActivityIndicator color={Colors.primary} size="large" />
        </View>
      )
    } 

    if(noResults){
      return(
        <View style={styles.rootContainer}>
            <Card style={styles.summary}>
              <Image style={styles.image} source={{uri: userData.url}} />
              <View style={styles.greetingContainer}>
                  <Text style={{textAlign: "center",fontSize: 15}}>Welcome!</Text>
                  <Text style={{...styles.greetingText, fontWeight: "bold"}}>{userData.name}</Text>
                  <Text style={{textAlign: "center",fontSize: 15}}>Authentication:</Text>
                  <Text style={{...styles.greetingText, fontWeight: "bold"}}>{userData.email}</Text>
                  </View>
            </Card>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <Text>No active results</Text>
            </View>
        </View>
      )
    }

    return(
        <View style={styles.rootContainer}>
            <Card style={styles.summary}>
              <Image style={styles.image} source={{uri: userData.url}} />
              <View style={styles.greetingContainer}>
                  <Text style={{textAlign: "center",fontSize: 15}}>Welcome!</Text>
                  <Text style={{...styles.greetingText, fontWeight: "bold"}}>{userData.name}</Text>
                  <Text style={{textAlign: "center",fontSize: 15}}>Authentication:</Text>
                  <Text style={{...styles.greetingText, fontWeight: "bold"}}>{userData.email}</Text>
                  </View>
            </Card>
            <FlatList data={dataSource.data} keyExtractor={ item => item.shopid } renderItem={ itemData => <ShopsChoice name={itemData.item.name} shopid={itemData.item.shopid} pressHandler = { ()=> {props.navigation.navigate('second',{email: userData.email, shopid: itemData.item.shopid})}} /> } />
        </View>
    )
}

Transactions['navigationOptions'] = () => (
    { 
      title: "Transactions",
      headerStyle: {
        backgroundColor: Colors.primary
      }
    }
)

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    height: '100%',
    backgroundColor: '#ccc'
  },
  rootContainer:{
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: '#ccc'
  },
  summary:{
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  greetingContainer: {
    flex: 1,
    justifyContent: "center"
  },
  greetingText:{
    textAlign: "center",
    //fontWeight: "bold",
    fontSize: 15
  }
})

export default Transactions