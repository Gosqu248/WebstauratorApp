import {Delivery, DeliveryHour} from "@/src/interface/delivery";
import {RestaurantOpinion} from "@/src/interface/restaurant-opinion";
import {RestaurantAddress} from "@/src/interface/restaurantAddress";
import {PaymentMethod} from "@/src/interface/paymentMethod";

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
    deliveryHours?: DeliveryHour[];
    opinions?: RestaurantOpinion[];
    address?: RestaurantAddress;
    paymentMethods?: PaymentMethod[];
    latitude: number;
    longitude: number;
}

export interface RestaurantInfo {
    id: number;
    name: string;
    category: string;
    logoUrl: string;
    imageUrl: string;
}
