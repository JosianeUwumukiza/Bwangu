import React from "react";
import tailwind from "twrnc";
import { Text, View, SafeAreaView, Image, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
    {
        id: "123",
        title: "Tega Moto",
        image: require("./motoicon.png"), // Use require for image loading
        screen: "MapScreen",
    },
];

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(item.screen)}
                    style={tailwind`p-50 pl-32 pb-10 pt-6 bg-blue-100`} // Adjusted padding for better spacing
                    disabled={!origin}
                >
                    <View style={tailwind`${!origin && "opacity-20"}`}>
                        <Image
                            style={{ width: 120, height: 120, resizeMode: "contain" }}
                            source={item.image} // Use image source from data
                        />
                        <Text style={tailwind`mt-2 text-black text-2xl font-semibold`}>
                            {item.title}
                        </Text>
                        <Icon
                            style={tailwind`p-1 bg-black rounded-full w-10 mt-2`} // Adjusted padding for icon
                            type="antdesign"
                            color="white"
                            name="arrowright"
                        />
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default NavOptions;
