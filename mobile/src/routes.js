import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import{ Image } from 'react-native'

import Feed from './pages/Feed'
import New from './pages/New'

import logo from './assets/logo.png'

export default createAppContainer(
    createStackNavigator({
        Feed,
        New
    }, {
        defaultNavigationOptions:{ // applies to all screens
            headerTintColor: '#000',
            headerTitle: <Image style={{marginHorizontal: 125}} source={logo}/>,
            headerBackTitle: null,
        },
        mode: 'modal'
    })
);