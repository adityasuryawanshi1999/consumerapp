import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'

const Stack1 = props => {
    const name = props.navigation.getParam('name')
    const email = props.navigation.getParam('email')
    const token = props.navigation.getParam('token')
    const url = props.navigation.getParam('url')

    return(
        <View>
            <Text>Hi</Text>
            <Text>{name}</Text>
        </View>
    )
}

export default Stack1