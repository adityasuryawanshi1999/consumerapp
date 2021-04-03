import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import Colors from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ShopsChoice from '../components/ShopsChoice'

const EnrolledShops = props => {
    var email = ""
    var url = ""
    var token = ""
    var name = ""
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const [noResults, setNoResults] = useState(false)
    const [dataSource, setDataSource] = useState({data:[]})
    const [refreshing, setRefreshing] = useState(false)

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

    const refresh = async() => {
          setRefreshing(true)
          fetch('https://rental-portal.000webhostapp.com/consumer/getenrolledshops.php', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                 
                    // Getting the id. 
                    email: userData.email
                 
                  })  
                  
                }).then((response) => response.json())
                      .then((responseJson) => { 
                        if(responseJson===0){
                          setNoResults(true)
                          setLoading(false)
                        }
                        else{
                        setDataSource({ data: responseJson})
                        setLoading(false)
                        //console.log(responseJson)
                        setNoResults(false)
                        //console.log(dataSource)
                        }
                      }).catch((error) => {
                        console.log(error);
                        setLoading(false)
                        setNoResults(true)
                      }); 
          setRefreshing(false)
    }
  
    if(loading){
      return(
        <View style={{justifyContent:"center", alignItems: "center",alignContent:"center", flex:1, backgroundColor: '#ccc'}}>
          <ActivityIndicator color={Colors.primary} size="large" />
        </View>
      )
    } 

    if(noResults){
        return(
            <View style={{flex: 1, backgroundColor: '#ccc', justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 18}}>No active results</Text>
            </View>
        )
    }

    return(
        <View style={styles.rootContainer}>
            <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />} data={dataSource.data} keyExtractor={ item => item.shopid } renderItem={ itemData => <ShopsChoice name={itemData.item.name} shopid={itemData.item.shopid} pressHandler = { ()=> {props.navigation.navigate('ProductsSecond',{shopid: itemData.item.shopid})}} /> } />
        </View>
    )
}

EnrolledShops['navigationOptions'] = () => (
    { 
      title: "Enrolled Shops",
      headerStyle: {
        backgroundColor: Colors.primary
      }
    }
)

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        backgroundColor: '#ccc',
        alignItems: "center",
        paddingTop: 2
    }
})

export default EnrolledShops