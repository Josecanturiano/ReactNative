import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IndexView from './Components/IndexView';
import DetailsView from './Components/viewDetails'
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import viewDetails from './Components/viewDetails';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen:IndexView,
      navigationOptions: {
        header: null,
      }
    },
    Details: {
      screen:DetailsView ,
      navigationOptions: {
        title: null,
      }  
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const Nav = createAppContainer(AppNavigator);

export default function App(){
    return (
      <Nav />
    )
}

