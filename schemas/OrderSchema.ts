import mongoose from 'mongoose'

import { OrderInterface } from "../interfaces/order"

const orderSchema = new mongoose.Schema<OrderInterface>({
  orderedOn: String,
  customerId: String,
  itemId: String,
  priceAtPurchase: Number,
  status: String
})

export default (mongoose.models.accounts as mongoose.Model<OrderInterface>) || mongoose.model<OrderInterface>("orders", orderSchema)