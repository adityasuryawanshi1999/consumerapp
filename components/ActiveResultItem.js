import { Text, View, StyleSheet, Image, Button, Platform, Touchable, Dimensions } from 'react-native'
import React from 'react'
import Card from './Card'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler'

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
    }
})

export default ActiveResultItem