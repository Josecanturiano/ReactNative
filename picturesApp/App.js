import React from "react";
import Home from "./Components/Home";
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
  },
  {
    initialRouteName: "Home",
  }
);

const Nav = createAppContainer(AppNavigator);

export default function App() {
  return <Nav />;
}
