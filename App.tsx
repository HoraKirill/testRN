import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from "./components/HomeScreen";
import QuotesScreen from "./components/QuotesScreen";
import {observer} from "mobx-react";

export enum EScreen {
    home = "О приложении",
    quotes = "Котировки"
}

const Tab = createBottomTabNavigator();

export default observer(function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused}) => {
                        let iconName = '';
                        if (route.name === EScreen.home) {
                            iconName = focused ? 'home-circle-outline' : 'home-circle';
                        } else {
                            iconName = focused ? 'table-large' : 'table-large-plus';
                        }
                        return <Icon name={iconName} size={35} color="#26A69A"/>;
                    },
                    tabBarActiveTintColor: 'red',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name={EScreen.home} component={HomeScreen}/>
                <Tab.Screen name={EScreen.quotes} component={QuotesScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
})


