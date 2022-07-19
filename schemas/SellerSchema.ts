import mongoose from 'mongoose'

import { ItemInterface } from '../interfaces/item'
import { OrderInterface } from '../interfaces/order'
import { SellerInterface } from '../interfaces/seller'

const sellerSchema = new mongoose.Schema<SellerInterface>({
  name: String,
  email: String,
  password: String,
  joinedOn: String,
  items: Array<ItemInterface>,
  orders: Array<OrderInterface>
})

export default (mongoose.models.sellers as mongoose.Model<SellerInterface>) || mongoose.model<SellerInterface>("sellers", sellerSchema)