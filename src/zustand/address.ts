import { create } from 'zustand';

interface AddressState {
    address: string;
    setAddress: (newAddress: string) => void;
}

export const useAddressStore = create<AddressState>((set) => ({
    address: '',
    setAddress: (newAddress) => set({ address: newAddress }),
}));


