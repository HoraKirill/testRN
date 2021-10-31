import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {observer} from "mobx-react";
import QuotesState, {ITicker} from "../state/QuotesState";


export default observer(function quotesScreen({navigation}: any) {
        let intervalValue: NodeJS.Timer

        function interval() {
            intervalValue = setInterval(QuotesState.getQuotes, 5000)
        }

        React.useEffect(
            () => {
                navigation.addListener('focus', () => interval())
            }, []
        );
        React.useEffect(
            () => navigation.addListener('blur', () => clearInterval(intervalValue)),
            []
        );

        const renderItem = ({item}: {item: ITicker}) => (
             <View style={style.row}>
                <View style={style.item}>
                    <Text>{item.name} </Text>
                </View>
                <View style={style.item}>
                    <Text >{item.last} </Text>
                </View>
                <View style={style.item}>
                    <Text >{item.highestBid} </Text>
                </View>
                <View style={style.item}>
                    <Text >{item.percentChange}</Text>
                </View>
            </View>
        )

        return (
            <SafeAreaView style={style.container}>
                {QuotesState.quotes.length == 0 ? (
                    <ActivityIndicator size="large"/>
                ) : ( <View style={style.row}>
                    <View style={style.item}>
                        <Text style={{textAlign: "center", fontWeight: "bold"}}>Name</Text>
                    </View>
                    <View style={style.item}>
                        <Text style={{textAlign: "center", fontWeight: "bold"}}>Last</Text>
                    </View>
                    <View style={style.item}>
                        <Text style={{textAlign: "center", fontWeight: "bold"}}>HighestBid</Text>
                    </View>
                    <View style={style.item}>
                        <Text style={{textAlign: "center", fontWeight: "bold"}}>PercentChange</Text>
                    </View>
                </View>)}
                {QuotesState.error && (
                    <View style={style.error}>
                        <Text>{QuotesState.errorMessage}</Text>
                    </View>
                )}
                <FlatList
                    contentContainerStyle={style.content}
                    data={QuotesState.quotes}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        )
    }
)

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    content: {
        alignItems: "stretch",
    },

    row: {
        flexDirection: "row",
    },

    item: {
        flex: 1,
        borderColor: 'grey',
        borderWidth: 1,
    },

    error: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "red",
    }
})
