import {Delivery} from "@/src/interface/delivery";

export interface Restaurant {
    restaurantId: number;
    name: string;
    category: string;
    logoUrl: string;
    imageUrl: string;
    distance?: number;
    pickup?: boolean;
    rating?: number;
    deliveryPrice?: number;
    delivery?: Delivery;
}

export interface RestaurantInfo {
    id: number;
    name: string;
    category: string;
    logoUrl: string;
    imageUrl: string;
}
