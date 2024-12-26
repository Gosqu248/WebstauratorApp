import { create } from 'zustand';

interface DeliveryState {
    deliveryType: 'delivery' | 'pickup';
    setDeliveryType: (type: 'delivery' | 'pickup') => void;
}

export const useDeliveryStore = create<DeliveryState>((set) => ({
    deliveryType: 'delivery',
    setDeliveryType: (type) => set({ deliveryType: type }),
}));
