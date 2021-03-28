import {createStackNavigator} from 'react-navigation-stack'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Transactions from '../screens/Transactions'
import Two from '../screens/Two'
import Three from '../screens/Three'
import LoginPage from '../screens/LoginPage'
import { createAppContainer } from 'react-navigation';
import {Ionicons} from '@expo/vector-icons'
import TransactionsCheck from '../screens/TransactionsCheck';
import EnrolledShops from '../screens/EnrolledShops'
import ProductsPage from '../screens/ProductsPage';
import ProductsDetailPage from '../screens/ProductsDetailPage';


const stackTransaction = createStackNavigator({
    first: Transactions,
    second: TransactionsCheck
})

const stackProducts = createStackNavigator({
    ProductsFirst: EnrolledShops,
    ProductsSecond: ProductsPage,
    ProductsThird: ProductsDetailPage
})



const tabNavigator = createBottomTabNavigator({
    Transactions: { screen: stackTransaction, navigationOptions: {
        tabBarIcon: (tabInfo => {
            return <Ionicons name='albums' size={25} color={'black'} />
        })
    }},
    Search: { screen: stackProducts, navigationOptions: {
        tabBarIcon: (tabInfo => {
            return <Ionicons name='search' size={25} color={'black'} />
        }),
    }},
    Enroll: { screen: Three, navigationOptions: {
        tabBarIcon: (tabInfo => {
            return <Ionicons name='add-circle-outline' size={25} color={'black'} />
        })
    }}
    
})

const loginStackNavigator = createStackNavigator({
    Login: LoginPage,
    Dashboard : {
        screen: tabNavigator,
        navigationOptions: {
          headerShown: false
        }
      }
})


export default createAppContainer(loginStackNavigator)

