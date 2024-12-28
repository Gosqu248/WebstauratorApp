import axios from "axios";
import config from "@/src/config";
import {DeliveryHour} from "@/src/interface/delivery";

export const fetchDeliveryHour = async (restaurantId: number) => {
    try {
        const response = await axios.get<DeliveryHour[]>(`${config.backendUrl}/delivery/time?restaurantId=${restaurantId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
};
