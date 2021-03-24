import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'

const TransactionsCheck = props => {
    const email = props.navigation.getParam('email')
    const shopid = props.navigation.getParam('shopid')

    return(
        <View>
            <Text>{email}</Text>
            <Text>{shopid}</Text>
        </View>
    )
}

export default TransactionsCheck