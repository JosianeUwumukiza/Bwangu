import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tailwind from "twrnc";
import Map from "../components/Map";
import MapView from 'react-native-maps';
import { createStackNavigator } from "@react-navigation/stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";

const MapScreen = () => {
    const Stack = createStackNavigator();

    return(
        <View style={styles.container}>
            <View style={tailwind`h-1/2`}>
                <Map/>
            </View>
            <View style={tailwind`h-1/2`}>
                <Stack.Navigator>
                <Stack.Screen
                    name="NavigateCard"
                    component={NavigateCard}
                    options={{
                        headerShown: false,
                    }}

                />
                <Stack.Screen
                    name="RideOptionsCard"
                    component={RideOptionsCard}
                    options={{
                        headerShown: false,
                    }}
                />
                </Stack.Navigator>
            </View>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
