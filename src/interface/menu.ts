import {Additives} from "@/src/interface/additives";

export interface Menu {
  id?: number;
  name: string;
  category: string;
  ingredients: string;
  price: number;
  image: string;
  additives?: Additives[];
}


