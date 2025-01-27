import axios from 'axios';
import api from "@/src/api";
import {Order} from "@/src/interface/order";
import {PaymentResponse} from "@/src/interface/paymentMethod";

const API_BASE_URL = api.backendUrl + "/payU";

export const createPayUPayment = async (order: Order): Promise<PaymentResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/createPayment`, order);
        return response.data;
    } catch (error) {
        console.error('Error creating PayU payment:', error);
        throw error;
    }
};

export const getPaymentStatus = async (orderId: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getPaymentStatus`, {
            params: { orderId },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching payment status:', error);
        throw error;
    }
};
