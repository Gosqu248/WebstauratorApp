import { create } from 'zustand';
import { UserAddress } from "@/src/interface/userAddress";

interface DeliveryAddressState {
    deliveryAddress: UserAddress | null;
    setDeliveryAddress: (newAddress: UserAddress) => void;
}

export const useDeliveryAddressStore = create<DeliveryAddressState>((set) => ({
    deliveryAddress: null,
    setDeliveryAddress: (newAddress) => set({ deliveryAddress: newAddress }),
}));
