import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./Components/Home";
import Create from "./Components/Create";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        //header: null,
      },
    },
    Create: {
      screen: Create,
      navigationOptions: {
        //title: null,
      },
    },
  },
  {
    initialRouteName: "Home",
  }
);

const Nav = createAppContainer(AppNavigator);

export default function App() {
  return <Nav />;
}
