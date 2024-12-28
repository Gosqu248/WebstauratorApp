import axios from "axios";
import config from "@/src/config";
import { Menu } from "@/src/interface/menu";

export const fetchMenu = async (restaurantId: string): Promise<(Menu | { isHeader: true; title: string })[]> => {
    try {
        const response = await axios.get<Menu[]>(`${config.backendUrl}/menu/getRestaurantMenu?restaurantId=${restaurantId}`);
        if (response?.data) {
            return response.data.reduce((acc, item) => {
                const categoryHeaderIndex = acc.findIndex(el => el.isHeader && el.title === item.category);
                if (categoryHeaderIndex === -1) {
                    acc.push({ isHeader: true, title: item.category });
                }
                acc.push(item);
                return acc;
            }, [] as (Menu | { isHeader: true; title: string })[]);
        } else {
            console.error('No menu data received');
            return [];
        }
    } catch (error) {
        console.error('Error fetching menu', error);
        return [];
    }
};
