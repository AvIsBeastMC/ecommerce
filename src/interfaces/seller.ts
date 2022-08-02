import { ItemInterface } from "./item";
import { OrderInterface } from "./order";

export interface SellerInterface {
    name: string,
    email: string,
    password: string,
    joinedOn: string,
    items: string[],
    orders: string[]
}