import { create } from 'zustand';
import { OrderMenu } from '@/src/interface/orderMenu';

interface CartState {
  basket: OrderMenu[];
  totalPrice: number;
  addToBasket: (item: OrderMenu) => void;
}

export const useCartStore = create<CartState>((set) => ({
  basket: [],
  totalPrice: 0,
  addToBasket: (item) => set((state) => {
    const newBasket = [...state.basket, item];
    const newTotalPrice = newBasket.reduce((total, currentItem) => {
      const additivesPrice = currentItem.chooseAdditives.reduce((sum, additive) => sum + additive.price, 0);
      return total + (currentItem.menu.price * currentItem.quantity) + (additivesPrice * currentItem.quantity);
    }, 0);
    return { basket: newBasket, totalPrice: newTotalPrice };
  }),
}));
