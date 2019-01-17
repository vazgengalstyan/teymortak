import React from "react";
import Main from "./src/screens/Main";
import Game from "./src/screens/Game";
import {createStackNavigator, createAppContainer} from "react-navigation";

const AppNavigator = createStackNavigator(
    {
        Main: Main,
        Game: Game
    },
    {
        headerMode: 'none',
        initialRouteName: "Main"
    }
);

export default createAppContainer(AppNavigator);