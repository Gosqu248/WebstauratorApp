
import axios from 'axios';
import api from '@/src/api';
import { SearchedRestaurant } from '@/src/interface/searchedRestaurant';
import { Delivery } from '@/src/interface/delivery';
import { RestaurantInfo} from '@/src/interface/restaurant';
import {RestaurantAddress} from "@/src/interface/restaurantAddress";

export const fetchSearchedRestaurants = async (address: string) => {
    const response = await axios.get<SearchedRestaurant[]>(
        `${api.backendUrl}/restaurantAddress/search?address=33-100`
    );
    return response.data;
};

export const fetchDelivery = async (restaurantId: number) => {
    try {
        const response = await axios.get<Delivery>(`${api.backendUrl}/delivery?restaurantId=${restaurantId}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching delivery', err);
        return null;
    }
};

export const fetchRestaurantData = async (restaurantId: number) => {
    try {
        const response = await axios.get<RestaurantInfo>(`${api.backendUrl}/restaurant/getRestaurant?id=${restaurantId}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching restaurant data', err);
        return null;
    }
};

export const fetchRestaurantAddress= async (restaurantId: number) => {
    try {
        const response = await axios.get<RestaurantAddress>(`${api.backendUrl}/restaurantAddress/get?restaurantId=${restaurantId}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching restaurant data', err);
        return null;
    }
};
