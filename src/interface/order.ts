import {Restaurant, RestaurantInfo} from "./restaurant";
import {OrderMenu} from "@/src/interface/orderMenu";
import {UserDTO} from "@/src/interface/restaurant-opinion";
import {UserAddress} from "@/src/interface/userAddress";

export interface Order {
  paymentMethod: string;
  status: OrderStatus;
  totalPrice: number;
  deliveryTime: string;
  deliveryOption: string;
  comment: string;
  paymentId: string | null;
  user: UserDTO;
  userAddress: UserAddress | null;
  restaurant: RestaurantInfo | null;
  orderMenus: OrderMenu[];
}


export interface OrderDTO {
  id: number;
  deliveryOption: string;
  deliveryTime: string;
  orderDate: string;
  orderMenus: OrderMenu[];
  paymentId: string;
  paymentMethod: string;
  restaurantId: number;
  restaurantName: string;
  restaurantLogo: string;
  status: OrderStatus;
  totalPrice: number;
  userAddress: UserAddress;
  hasOpinion: boolean;
}

export interface AdminOrderDTO {
  id: number;
  deliveryOption: string;
  deliveryTime: string;
  orderDate: string;
  orderMenus: OrderMenu[];
  paymentId: string;
  paymentMethod: string;
  restaurantId: number;
  restaurantName: string;
  status: OrderStatus;
  totalPrice: number;
  city: string;
  houseNumber: string;
  street: string;
  zipCode: string;
  restaurantLogo: string;
  userName: string;
  userEmail: string;
  userPhone: string;
}

export enum OrderStatus {
  zapłacone = "zapłacone",
  niezaplcone = "niezapłacone",
}
