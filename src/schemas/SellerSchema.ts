import mongoose from 'mongoose'
import { SellerInterface } from "../interfaces/seller"

const sellerSchema = new mongoose.Schema<SellerInterface>({
  name: String,
  email: String,
  password: String,
  joinedOn: String,
  items: Array<string>,
  orders: Array<string>
})

export default (mongoose.models.sellers as mongoose.Model<SellerInterface>) || mongoose.model<SellerInterface>("sellers", sellerSchema)