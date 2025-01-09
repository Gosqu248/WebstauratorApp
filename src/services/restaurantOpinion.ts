import axios from "axios";
import api from "@/src/api";
import {RestaurantOpinion} from "@/src/interface/restaurant-opinion";

export const fetchRestaurantOpinion = async (restaurantId: number) => {
    try {
        const response = await axios.get<RestaurantOpinion[]>(`${api.backendUrl}/opinions/restaurantOpinions?restaurantId=${restaurantId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
};
