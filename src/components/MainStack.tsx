import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";

import { HomeScreen } from './HomeScreen';
import { DetailsTourneeScreen } from './TourneeScreen';
import { TourneeService } from '../services/tournee.services';
import { TourneeModel } from '../models/tournee.model';

const StackNavigator = stackNavigatorFactory();

/**
 * The main stack navigator for the whole app.
 */
export const MainStack = () => {
    
    return (
        <BaseNavigationContainer>
            <StackNavigator.Navigator
                initialRouteName="Tournee"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "white",
                    },
                    headerShown: true,
                }}
            >
                <StackNavigator.Screen
                    name="Tournee"
                    component={HomeScreen}
                />

                <StackNavigator.Screen
                    name="Details"
                    component={DetailsTourneeScreen}
                />
            </StackNavigator.Navigator>
        </BaseNavigationContainer>
    )
};
