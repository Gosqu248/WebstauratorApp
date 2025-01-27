import { create } from 'zustand';

interface CurrentRestaurantState {
    currentRestaurant: number | null;
    setCurrentRestaurant: (restaurantId: number | null) => void;
}

export const useCurrentRestaurantStore = create<CurrentRestaurantState>((set) => ({
    currentRestaurant: null,
    setCurrentRestaurant: (restaurantId: number | null) => {
        set({ currentRestaurant: restaurantId });
    },
}));
