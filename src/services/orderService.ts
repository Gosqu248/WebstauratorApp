import api from "@/src/api";
import { Order } from "@/src/interface/order";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createOrder = async (order: Order) => {
    try {
        const response = await fetch(`${api.backendUrl}/order/createOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const getUserOrders = async () => {
    const jwt = await AsyncStorage.getItem('jwt');
    try {
        const response = await fetch(`${api.backendUrl}/order/getUserOrders`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
}
