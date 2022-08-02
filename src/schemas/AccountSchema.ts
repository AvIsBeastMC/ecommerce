import mongoose from 'mongoose'

import { AccountInterface, AccountOrderInterface } from "../interfaces/account"

const accountSchema = new mongoose.Schema<AccountInterface>({
  name: String,
  email: String,
  password: String,
  orders: Array<string>,
  createdOn: String,
  address: String,
  country: String
})

export default (mongoose.models.accounts as mongoose.Model<AccountInterface>) || mongoose.model<AccountInterface>("accounts", accountSchema)