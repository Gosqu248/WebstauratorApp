import { create } from 'zustand';

interface CurrentRestaurantState {
    currentRestaurant: number;
    setCurrentRestaurant: (restaurantId: number | null) => void;
}

export const useCurrentRestaurantStore = create<CurrentRestaurantState>((set) => ({
    currentRestaurant: null,
    setCurrentRestaurant: (restaurantId: number) => {
        set({ currentRestaurant: restaurantId });
    },
}));
