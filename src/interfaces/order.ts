import { AccountOrderInterface } from "./Account";

export interface OrderInterface extends AccountOrderInterface {
    orderedOn: string,
    customerId: string,
    itemId: string,
    priceAtPurchase: number,
    status: 'placed' | 'on the way' | 'delivered' | 'cancelledBySeller' | 'cancelledByCustomer'
}