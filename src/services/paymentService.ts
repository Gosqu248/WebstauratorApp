import axios from "axios";
import config from "@/src/config";
import {PaymentMethod} from "@/src/interface/paymentMethod";

export const fetchRestaurantPaymentMethods = async (restaurantId: number) => {
    try {
        const response = await axios.get<PaymentMethod[]>(`${config.backendUrl}/paymentMethods/getRestaurantPayments?restaurantId=${restaurantId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
};
