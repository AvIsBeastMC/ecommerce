import mongoose from 'mongoose'

import { ItemInterface } from '../interfaces/item'

const itemSchema = new mongoose.Schema<ItemInterface>({
  title: String,
  brand: String,
  sellerId: String,
  stock: Number,
  orders: Number
})

export default (mongoose.models.items as mongoose.Model<ItemInterface>) || mongoose.model<ItemInterface>("items", itemSchema)