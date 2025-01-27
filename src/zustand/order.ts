import { create } from 'zustand';
import { UserAddress } from '@/src/interface/userAddress';
import {string} from "prop-types";

type OrderState = {
    deliveryAddress: UserAddress;
    setDeliveryAddress: (newAddress: UserAddress) => void;

    selectedPayment: string;
    setSelectedPayment: (payment: string) => void;

    selectedOption: string;
    setSelectedOption: (option: string) => void;

    comment: string;
    setComment: (comment: string) => void;

    name: string;
    setName: (name: string) => void;

    email: string;
    setEmail: (email: string) => void;

    phone: string;
    setPhone: (phone: string) => void;

};

export const useOrderStore = create<OrderState>((set) => ({
    deliveryAddress: {} as UserAddress,
    setDeliveryAddress: (newAddress) => set({ deliveryAddress: newAddress }),

    selectedPayment: string,
    setSelectedPayment: (payment) => set({ selectedPayment: payment }),

    selectedOption: '',
    setSelectedOption: (option) => set({ selectedOption: option }),

    comment: '',
    setComment: (comment) => set({ comment }),

    name: '',
    setName: (name) => set({ name }),

    email: '',
    setEmail: (email) => set({ email }),

    phone: '',
    setPhone: (phone) => set({ phone }),
}));
