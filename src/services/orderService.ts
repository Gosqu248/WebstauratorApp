import api from "@/src/api";
import { Order } from "@/src/interface/order";

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
