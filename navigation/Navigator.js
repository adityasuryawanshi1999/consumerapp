import {createStackNavigator} from 'react-navigation-stack'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import One from '../screens/One'
import Two from '../screens/Two'
import Three from '../screens/Three'
import LoginPage from '../screens/LoginPage'
import { createAppContainer } from 'react-navigation';


const tabNavigator = createBottomTabNavigator({
    screen1: One,
    screen2: Two,
    screen3: Three
})

const loginStackNavigator = createStackNavigator({
    Login: LoginPage,
    Dashboard: tabNavigator
})


export default createAppContainer(loginStackNavigator)

