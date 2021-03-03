import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions, Button } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import Card from '../components/Card'
import { ScrollView } from 'react-native-gesture-handler'

const LoginPage = props => {

    const imageArray = ['https://rental-portal.000webhostapp.com/1-2.png','https://rental-portal.000webhostapp.com/2.png','https://rental-portal.000webhostapp.com/3.png','https://rental-portal.000webhostapp.com/4.png']

    return(  
        <ScrollView style={styles.root}>
            <View style={styles.rootContainer} >
                <View style={styles.sliderContainer}>
                    <SliderBox images={imageArray} circleLoop={true} sliderBoxHeight={290} paginationBoxVerticalPadding={20}  ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}} resizeMethod={'resize'} resizeMode={'cover'} paginationBoxStyle={{position: "absolute", bottom: 0, padding: 0, alignItems: "center", alignSelf: "center", justifyContent: "center", paddingVertical: 10}} />
                </View>
                <View style={styles.textContainer} >
                    <Card style={{width: '98%', flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center'}} >
                        <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}} >Bonjour!</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 15, textAlign: 'center'}} >Sign in with resgistered shop email!</Text>
                        <Button title="Next" onPress={()=> props.navigation.navigate('Dashboard')} />
                    </Card>
                </View>
                <Text style={{color: 'black', marginTop: Dimensions.get('screen').width*0.05, textAlign: 'center'}} >Rental Portal Shops</Text>
                <Text style={{color: 'black', textAlign: 'center', paddingBottom: 10}} >No Copyrights Intended</Text>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    rootContainer: {
        height: '100%',
        //justifyContent: "center",
        alignItems: "center",
        //marginBottom: 200
    },
    sliderContainer: {
        marginTop: 5,
        height: 300
    },
    textContainer: {
        marginTop: 5,
        width: '98%',
        height: 250,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    root:{
      flex: 1,
      backgroundColor: '#ccc',
      paddingBottom: 15
    }
})

export default LoginPage