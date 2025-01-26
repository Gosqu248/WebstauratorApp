import { create } from 'zustand';
import {
    fetchSearchedRestaurants,
    fetchDelivery,
    fetchRestaurantData,
    fetchRestaurantAddress
} from '@/src/services/restaurantService';
import { Restaurant } from '@/src/interface/restaurant';
import {fetchDeliveryHour} from "@/src/services/deliveryHourService";
import {fetchRestaurantOpinion} from "@/src/services/restaurantOpinion";
import {fetchRestaurantPaymentMethods} from "@/src/services/paymentService";

interface RestaurantState {
    restaurants: Restaurant[];
    isLoading: boolean;
    error: string | null;
    fetchRestaurants: (address: string) => Promise<void>;
    getRestaurantById: (restaurantId: number) => Restaurant | undefined;
}

export const useRestaurantStore = create<RestaurantState>((set, get) => ({
    restaurants: [],
    isLoading: false,
    error: null,
    fetchRestaurants: async (address: string) => {
        set({ isLoading: true, error: null });

        try {
            const searchedRestaurants = await fetchSearchedRestaurants(address);

            const restaurantsWithData: Restaurant[] = await Promise.all(
                searchedRestaurants.map(async (restaurant) => {
                    const restaurantData = await fetchRestaurantData(restaurant.restaurantId);
                    const delivery = await fetchDelivery(restaurant.restaurantId);
                    const deliveryHours = await fetchDeliveryHour(restaurant.restaurantId);
                    const opinions = await fetchRestaurantOpinion(restaurant.restaurantId);
                    const address = await fetchRestaurantAddress(restaurant.restaurantId);
                    const paymentMethods = await fetchRestaurantPaymentMethods(restaurant.restaurantId);


                    return {
                        restaurantId: restaurant.restaurantId,
                        name: restaurant.name,
                        category: restaurant.category,
                        logoUrl: restaurantData.logoUrl || '',
                        imageUrl: restaurantData.imageUrl || '',
                        distance: restaurant.distance || undefined,
                        pickup: restaurant.pickup || false,
                        rating: restaurant.rating || 0,
                        deliveryPrice: restaurant.deliveryPrice || undefined,
                        delivery: delivery,
                        deliveryHours: deliveryHours,
                        opinions: opinions,
                        address: address,
                        paymentMethods: paymentMethods,
                        latitude: restaurant.lat,
                        longitude: restaurant.lon,
                    };
                })
            );

            set({ restaurants: restaurantsWithData, isLoading: false });
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : 'An error occurred',
                isLoading: false,
            });
        }
    },
    getRestaurantById: (restaurantId: number) => {
        const { restaurants } = get();
        return restaurants.find(restaurant => restaurant.restaurantId === restaurantId);
    },
}));
