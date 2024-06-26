import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import tailwind from 'twrnc';

const data = [
    {
        id: '123',
        icon: 'home',
        description: 'Home',
        location: 'Code Street, London, UK',
    },
    {
        id: '456',
        icon: 'briefcase',
        description: 'Work',
        location: 'The Shard, London Bridge Street, London, UK',
    },
    {
        id: '789',
        icon: 'heart',
        description: 'Bambi\'s House',
        location: '15 Sakuru Road, Sagamu, Nigeria',
    },
];

const NavFavourites = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    return (
        <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={tailwind`bg-blue-100 h-[0.5px]`} /> 
      )}
      renderItem={({ item: { location, description, icon } }) => (
        <TouchableOpacity
          style={tailwind`flex-row items-center px-4 py-2 bg-blue-100 my-2 rounded-lg`} // Background color changed
          onPress={(item) => {
            // ... (your onPress logic remains the same)
          }}
        >
          <View style={tailwind`flex-row items-center`}>
            <Icon
              name={icon}
              type="ionicon"
              color="white"
              size={14}
              style={tailwind`bg-blue-400 p-2 rounded-full mr-2`} // Tailwind styles for icon
            />
            <View>
              <Text style={tailwind`font-semibold text-lg`}>{description}</Text>
              <Text style={tailwind`text-gray-500`}>{location}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites