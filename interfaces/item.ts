export interface ItemInterface {
    title: string,
    brand: string,
    sellerId: string,
    stock: number,
    orders: number
}

export interface MongooseItemInterface extends ItemInterface {
    _id: string
}