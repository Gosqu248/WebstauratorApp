import {View, Text} from 'react-native'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import config from "@/src/config";
import {Menu} from "@/src/interface/menu";
import {useRoute} from "@react-navigation/native";

const RestaurantItems = () => {
    const [menu, setMenu] = useState([]);
    const route = useRoute();
    const { restaurantId } = route.params;


    const fetchMenu = async () => {
        const response = await axios.get<Menu>(`${config.backendUrl}/menu/getRestaurantMenu?restaurantId=${restaurantId}`);
        if (response) {
            setMenu(response.data);
        } else {
            console.error('Error fetching menu');
        }
    }

    useEffect(() => {
       fetchMenu()
    }, []);


    return (
        <View>
            <Text>RestaurantItems</Text>
        </View>
    )
}
export default RestaurantItems
