import axios from "axios";
import api from "@/src/api";

export const fetchCategories = async (restaurantId: string) => {
    try {
        const response = await axios.get(`${api.backendUrl}/menu/menuCategories?restaurantId=${restaurantId}`);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};
