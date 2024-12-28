import axios from "axios";
import config from "@/src/config";
import {RestaurantOpinion} from "@/src/interface/restaurant-opinion";

export const fetchRestaurantOpinion = async (restaurantId: number) => {
    try {
        const response = await axios.get<RestaurantOpinion[]>(`${config.backendUrl}/opinions/restaurantOpinions?restaurantId=${restaurantId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
};
