import {Menu} from "@/src/interface/menu";
import {Additives} from "@/src/interface/additives";

export interface OrderMenu {
    menu: Menu;
    quantity: number;
    chooseAdditives: Additives[];
}
