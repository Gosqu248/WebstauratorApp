import axios from "axios";
import api from "@/src/api";
import {PaymentMethod} from "@/src/interface/paymentMethod";

export const fetchRestaurantPaymentMethods = async (restaurantId: number) => {
    try {
        const response = await axios.get<PaymentMethod[]>(`${api.backendUrl}/paymentMethods/getRestaurantPayments?restaurantId=${restaurantId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
};
