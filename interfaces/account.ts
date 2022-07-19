export interface AccountOrderInterface {
    itemId: string,
}

export interface AccountInterface {
    name: string,
    email: string,
    password: string,
    orders: AccountOrderInterface[],
    createdOn: string,
    address: string,
    country: string
}

export interface MongooseAccountInterface extends AccountInterface {
    _id: string
}