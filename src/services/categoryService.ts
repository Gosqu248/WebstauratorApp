import axios from "axios";
import config from "@/src/config";

export const fetchCategories = async (restaurantId: string) => {
    try {
        const response = await axios.get(`${config.backendUrl}/menu/menuCategories?restaurantId=${restaurantId}`);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};
