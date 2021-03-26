import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions, ActivityIndicator, FlatList } from 'react-native'
import Colors from '../constants/Colors'
import ActiveResultItem from '../components/ActiveResultItem'

const TransactionsCheck = props => {
    const email = props.navigation.getParam('email')
    const shopid = props.navigation.getParam('shopid')
    const [dataSource, setDataSource] = useState({data:[]})
    const [loading, setLoading] = useState(true)
    const [noresults, setNoResults] = useState(false)

    useEffect( () => { 
        (async() => {
            fetch('https://rental-portal.000webhostapp.com/consumer/fetchactivetransactions.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
               
                  // Getting the id.
                  email: email,
                  table: shopid+"-transaction",
                  table2: shopid+"-products"
               
                }) 
                
              }).then((response) => response.json())
                    .then((responseJson) => {
                      if(responseJson===0){
                          setLoading(false)
                          setNoResults(true)
                      }
                      else{
                      console.log(responseJson)
                      setDataSource({ data: responseJson})
                      console.log(dataSource)
                      setLoading(false)
                      setNoResults(false)}
                    }).catch((error) => {
                      console.log(error);
                      setLoading(false)
                      setNoResults(true)
                    }); 
        })();
    },[])

    const refresh = async() => {
      console.log("refresh")
      fetch('https://rental-portal.000webhostapp.com/consumer/fetchactivetransactions.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
         
            // Getting the id.
            email: email,
            table: shopid+"-transaction",
            table2: shopid+"-products"
         
          }) 
          
        }).then((response) => response.json())
              .then((responseJson) => {
                if(responseJson===0){
                    setLoading(false)
                    setNoResults(true)
                }
                else{
                console.log(responseJson)
                setDataSource({ data: responseJson})
                console.log(dataSource)
                setLoading(false)
                setNoResults(false)}
              }).catch((error) => {
                console.log(error);
                setLoading(false)
                setNoResults(true)
              }); 
  }

    if(loading){
        return(
            <View style={{flex: 1, backgroundColor: '#ccc', justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    if(noresults){
        return(
            <View style={{flex: 1, backgroundColor: '#ccc', justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 18}}>No active results</Text>
            </View>
        )
    }

    return(
        <View style={{flex: 1, backgroundColor: '#ccc', alignItems: "center", paddingTop: 2}}>
            <FlatList data={dataSource.data} keyExtractor={ item => item.product_id } renderItem={ itemData => <ActiveResultItem issueDate={itemData.item.issue_date} name={itemData.item.name} productId={itemData.item.product_id}  email={email} shopid={shopid} returnDate={itemData.item.return_date}  refreshFunc={refresh} /> } />
        </View>
    )
}

TransactionsCheck['navigationOptions'] = () => (
    { 
      title: "Ongoing Transactions",
      headerStyle: {
        backgroundColor: Colors.primary
      }
    }
)

export default TransactionsCheck