import React from "react";
import Main from "./src/screens/Main";
import {createStackNavigator, createAppContainer} from "react-navigation";

const AppNavigator = createStackNavigator(
    {
        Main: Main
    },
    {
        headerMode: 'none',
        initialRouteName: "Main"
    }
);

export default createAppContainer(AppNavigator);