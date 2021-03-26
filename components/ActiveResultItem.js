import { Text, View, StyleSheet, Image, Button, Platform, Touchable, Dimensions, Alert } from 'react-native'
import React from 'react'
import Card from './Card'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'

const ActiveResultItem = props => {

    let TouchableCmp = Platform.OS === 'android' && Platform.Version>=21 ? TouchableNativeFeedback : TouchableOpacity
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    var collectedFine = 0
    var returnDate = props.returnDate
    const words = returnDate.split('-')
    returnDate = words[2]+'/'+words[1]+'/'+words[0]
    const date1 = new Date(parseInt(yyyy),parseInt(mm),parseInt(dd));
    const date2 = new Date(parseInt(words[0]),parseInt(words[1]),parseInt(words[2]));
    const diffTime = date1 - date2;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //console.log(diffDays*fine)
    var future = new Date(); // get today date
    future.setDate(future.getDate() + 7); // add 7 days
    var finalDate = future.getFullYear() +'-'+ ((future.getMonth() + 1) < 10 ? '0' : '') + (future.getMonth() + 1) +'-'+ future.getDate();
    console.log(finalDate)

    const update = async() => {
        if(date1===date2){
            (async() => {
                fetch('https://rental-portal.000webhostapp.com/consumer/reissueproduct.php', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                   
                      // Getting the id.
                      table: props.shopid+"-transaction",
                      email: props.email,
                      pid: props.productId,
                      returnDate: finalDate
                   
                    }) 
                    
                  }).then((response) => response.json())
                        .then((responseJson) => {
                          Alert.alert("Status", responseJson, [{text: "Okay", onPress: ()=> {} }])
                        }).catch((error) => {
                          console.error(error);
                        }); 
            })();
        }
        else{
            Alert.alert("Date Collapsed/Early","Your Re-Issue date has either collapsed or it isn't the final day of your issued product.",[{text: "Okay", onPress: ()=> {} }])
        }
        props.refreshFunc();
    }

    if(diffTime<=0){
        collectedFine = 0
        }
    else{
        collectedFine = fine*diffDays
    }

    return(
        <TouchableCmp onPress={props.pressHandler} >
            <Card style={styles.container}>
                <View style={styles.textContent}>
                    <Text style={{fontWeight: "bold"}}>{props.name}</Text>
                    <Text>Product Id: {props.productId}</Text>
                    <Text>Issue Date: {props.issueDate}</Text>
                    <Text>Return Date: {props.returnDate}</Text>
                    <Text>Fine: {collectedFine}</Text>
                </View>
                <TouchableCmp onPress={update}>
                    <View style={styles.button}>
                        <Text>Re-Issue</Text>
                    </View>
                </TouchableCmp>
            </Card>
        </TouchableCmp>
    )

}

const styles = StyleSheet.create({
    container:{
        width: Dimensions.get('window').width*0.98,
        //flexDirection: "row",
        marginVertical: 2,
        alignContent: "center"
    },
    image:{
        height: 60,
        width: 60,
        borderRadius: 10
    },
    textContent:{
        width: Dimensions.get('window').width*0.60
    },
    button:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        //width: Dimensions.get('screen').width*0.60,
        alignContent: "center",
        height: 40,
        borderRadius: 20,
        marginHorizontal: 20,
        overflow: "hidden",
        marginTop: 4
    }
})

export default ActiveResultItem