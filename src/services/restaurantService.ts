
import axios from 'axios';
import config from '@/src/config';
import { SearchedRestaurant } from '@/src/interface/searchedRestaurant';
import { Delivery } from '@/src/interface/delivery';
import { RestaurantInfo} from '@/src/interface/restaurant';

export const fetchSearchedRestaurants = async (address: string) => {
    const response = await axios.get<SearchedRestaurant[]>(
        `${config.backendUrl}/restaurantAddress/search?address=33-100`
    );
    return response.data;
};

export const fetchDelivery = async (restaurantId: number) => {
    try {
        const response = await axios.get<Delivery>(`${config.backendUrl}/delivery?restaurantId=${restaurantId}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching delivery', err);
        return null;
    }
};

export const fetchRestaurantData = async (restaurantId: number) => {
    try {
        const response = await axios.get<RestaurantInfo>(`${config.backendUrl}/restaurant/getRestaurant?id=${restaurantId}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching restaurant data', err);
        return null;
    }
};
