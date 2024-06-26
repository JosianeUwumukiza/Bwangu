import { SafeAreaView, StyleSheet, Text, SafeAreaViewBase, View } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';

const NavigateCard = () => {
    const  dispatch = useDispatch();
    const navigation = useNavigation();

  return (
    <SafeAreaView style={tailwind`bg-white flex-1`}>
      <Text style={tailwind`text-center py-5 text-xl`}>Muraho! </Text>
      <View style={tailwind`border-t border-blue-100 flex-shrink`}>
        <View>
            <GooglePlacesAutocomplete 
            placeholder='Ugiye he?'
            fetchDetails={true}
            enablePoweredByContainer ={false}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details) =>{
                dispatch(setDestination ({
                    location: details.geometry.location,
                    description: data.description,
                }) 
                );
                navigation.navigate("RideOptionsCard");
            }}  
            styles={toInputBoxStyles}
            query={{ 
                key: GOOGLE_MAPS_APIKEY,
                language: "en",
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
             />
        </View>
        <NavFavorites/>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,

    },
    textInputContainer:{
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
});