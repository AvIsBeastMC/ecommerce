import { ItemInterface } from "./Item";
import { OrderInterface } from "./Order";

export interface SellerInterface {
    name: string,
    email: string,
    password: string,
    joinedOn: string,
    items: string[],
    orders: string[]
}

export interface MongooseSellerInterface extends SellerInterface {
    _id: string
}