/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import HomePage from './src/pages/homePage';

import {createStackNavigator} from 'react-navigation-stack';
import MyList from './src/pages/myList';
import SignInPage from './src/pages/signInPage';
import AuthLoadingScreen from './src/pages/authLoadingScreen';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import NewRequest from './src/pages/newRequest';

const AppStack = createStackNavigator({ Home: HomePage,  MyList: MyList, NewRequest: NewRequest});
const AuthStack = createStackNavigator({ SignIn: SignInPage });

export default createAppContainer(createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
));
