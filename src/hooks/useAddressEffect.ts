import { useAddressStore } from '@/src/zustand/address';
import { useRestaurantStore } from '@/src/zustand/restaurantStore';
import { useEffect } from 'react';

export const useAddressEffect = () => {
    const { address } = useAddressStore();
    const { fetchRestaurants } = useRestaurantStore();

    useEffect(() => {
        if (address) {
            fetchRestaurants(address);
        }
    }, [address, fetchRestaurants]);
};
