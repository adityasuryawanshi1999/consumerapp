import React, { useState,useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'
import ProductItem from '../components/ProductItem'
import Card from '../components/Card'

const ProductsPage = props => {
    const shopid = props.navigation.getParam('shopid')

    return(
        <View>
            <Text>Hi</Text>
            <Text>{shopid}</Text>
        </View>
    )
}

ProductsPage['navigationOptions'] = () => (
    { 
      title: "Products",
      headerStyle: {
        backgroundColor: Colors.primary
      }
    }
)

export default ProductsPage