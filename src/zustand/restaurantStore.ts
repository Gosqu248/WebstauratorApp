import { create } from 'zustand';
import { fetchSearchedRestaurants, fetchDelivery, fetchRestaurantData } from '@/src/services/restaurantService';
import { Restaurant } from '@/src/interface/restaurant';

interface RestaurantState {
    restaurants: Restaurant[];
    isLoading: boolean;
    error: string | null;
    fetchRestaurants: (address: string) => Promise<void>;
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
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


                    return {
                        restaurantId: restaurant.restaurantId,
                        name:  restaurant.name,
                        category:  restaurant.category,
                        logoUrl: restaurantData.logoUrl || '',
                        imageUrl: restaurantData.imageUrl || '',
                        distance: restaurant.distance || undefined,
                        pickup: restaurant.pickup || false,
                        rating: restaurant.rating || 0,
                        deliveryPrice: restaurant.deliveryPrice || undefined,
                        delivery: delivery || undefined,
                        latitude: restaurant.lat ,
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
}));
