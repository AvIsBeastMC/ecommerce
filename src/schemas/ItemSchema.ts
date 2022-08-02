import { ImageInfo, ItemInterface } from '../interfaces/item'

import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema<ItemInterface>({
  sellerId: String,
  title: String,
  brand: String,
  category: String,
  description: String,
  stock: Number,
  orders: Array<string>,
  image: String
})

export default (mongoose.models.items as mongoose.Model<ItemInterface>) || mongoose.model<ItemInterface>("items", itemSchema)