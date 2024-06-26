import React from "react";
import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity, Image } from "react-native";
import tailwind from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_APIKEY} from "@env" ;
import { useDispatch } from "react-redux";
import { setDestination,setOrigin } from "../slices/navSlice";
import NavFavorites from "../components/NavFavorites";
import { Linking } from 'react-native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tailwind`bg-white h-full`}>
      <View style={tailwind`p-3`}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.image}
        />

        <GooglePlacesAutocomplete
          placeholder="Uvuye he?"
          styles={{
            container: {
              flex:0,
            },
            textInput:{
              fontSize: 18,
            },

          }}
          onPress={(data, details = null) =>{
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description,
            }))
            dispatch(setDestination(null))
        
          }}
          fetchDetails = {true}
          returnKeyType = {"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query ={{ 
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <NavOptions/>
        <NavFavorites/>
      </View>
      <TouchableOpacity 
          onPress={() => Linking.openURL('https://rwererewebtrial.my.canva.site/home')} 
          style={tailwind`p-2`}
        >
          <View style={tailwind`flex-row items-center`}> 
            {/* Icon (replace with your actual icon component) */}
            {/*<Icon name={item.icon} style={tailwind`mr-2`} /> */}

            <View style={tailwind`flex-col`}>
              <Text style={tailwind`text-lg font-semibold`}>Ufite Ikibazo</Text>
              <View style={tailwind`flex-row items-center mt-1`}>
                <Text style={tailwind`text-blue-500 underline`}>Sura Urubuga Rwacu</Text>
                <Image
                  source={require('../components/motoicon.png')}
                  style={tailwind`w-6 h-6 ml-2`}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "purple",
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
});
