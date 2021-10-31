import React from 'react';
import {Button, Text, View} from "react-native";
import {EScreen} from "../App";


function HomeScreen({navigation}:any) {

    const navigateToQuotes = () => navigation.navigate(EScreen.quotes)

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Home page quotes</Text>
            <Button
                title="Go to Quotes"
                onPress={navigateToQuotes}
            />
        </View>
    )
}

export default HomeScreen;