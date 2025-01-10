import axios from "axios";
import {UserAddress} from "@/src/interface/userAddress";
import api from "@/src/api";

const API_URL = api.backendUrl + '/address';


export const fetchAvailableAddresses = async (jwt, coordinates) => {
    try {
        const response = await axios.get<UserAddress[]>(`${API_URL}/available?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user addresses:', error);
        return null;
    }
}
