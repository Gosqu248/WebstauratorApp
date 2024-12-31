import { create } from 'zustand';
import { OrderMenu } from '@/src/interface/orderMenu';
import {Menu} from "@/src/interface/menu";

interface RestaurantCart {
  basket: OrderMenu[];
  currentPrice: number;
}

interface CartState {
  carts: Record<number, RestaurantCart>;
  addToBasket: (restaurantId: number, item: OrderMenu) => void;
  getRestaurantCart: (restaurantId: number) => RestaurantCart;
  increaseQuantity: (restaurantId: number, menu: Menu ) => void;
  decreaseQuantity: (restaurantId: number, menu: Menu ) => void;
}

const calculateCurrentPrice = (basket: OrderMenu[]) =>
    basket.reduce((total, item) => {
      const additivesPrice = item.chooseAdditives.reduce((sum, additive) =>
          sum + additive.price, 0);
      return total + (item.menu.price * item.quantity) + (additivesPrice * item.quantity);
    }, 0);

export const useCartStore = create<CartState>((set, get) => ({
  carts: {},

  addToBasket: (restaurantId, item) => set((state) => {
    const restaurantCart = state.carts[restaurantId] || { basket: [], currentPrice: 0 };
    const existingItemIndex = restaurantCart.basket.findIndex(basketItem => basketItem.menu.id === item.menu.id);

    let newBasket;
    if (existingItemIndex !== -1) {
      newBasket = restaurantCart.basket.map((basketItem, index) =>
          index === existingItemIndex
              ? { ...basketItem, quantity: basketItem.quantity + 1 }
              : basketItem
      );
    } else {
      newBasket = [...restaurantCart.basket, { ...item, quantity: 1 }];
    }

    const newCurrentPrice = calculateCurrentPrice(newBasket);

    return {
      carts: {
        ...state.carts,
        [restaurantId]: {
          basket: newBasket,
          currentPrice: newCurrentPrice
        }
      }
    };
  }),

  getRestaurantCart: (restaurantId) => {
    const state = get();
    return state.carts[restaurantId] || { basket: [], currentPrice: 0 };
  },

  increaseQuantity: (restaurantId, menu) => set((state) => {
    const restaurantCart = state.carts[restaurantId];
    if (!restaurantCart) return state;

    const newBasket = restaurantCart.basket
        .map(item => item.menu === menu ? { ...item, quantity: item.quantity + 1 } : item)
    const newCurrentPrice = calculateCurrentPrice(newBasket);

    return {
      carts: {
        ...state.carts,
        [restaurantId]: {
            basket: newBasket,
            currentPrice: newCurrentPrice
        }
      }
    };
  }),

  decreaseQuantity: (restaurantId, menu) => set((state) => {
    const restaurantCart = state.carts[restaurantId];
    if (!restaurantCart) return state;

    const newBasket = restaurantCart.basket
        .map(item => item.menu === menu ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0);
    const newCurrentPrice = calculateCurrentPrice(newBasket);

    return {
      carts: {
        ...state.carts,
        [restaurantId]: {
          basket: newBasket,
          currentPrice: newCurrentPrice
        }
      }
    };
  }),

}));
