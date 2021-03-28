import React from 'react'
import {Text, View, StyleSheet, Dimensions} from 'react-native'
import Colors from '../constants/Colors'

const Header = props => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: Dimensions.get('screen').height*0.09,
        backgroundColor: Colors.primary,
        width: '100%'
    },
    text: {
        paddingTop: Dimensions.get('screen').height*0.05,
        fontSize: 20,
        paddingLeft: Dimensions.get('screen').width*0.06,
        fontWeight: "bold"
    }
})

export default Header