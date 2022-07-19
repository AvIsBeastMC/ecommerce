// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import AccountSchema from '../../schemas/AccountSchema'
import { AccountInterface, MongooseAccountInterface } from '../../interfaces/account'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import initMiddleware from '../../hooks/initMiddleware'
import mongoose from 'mongoose'
import NextCors from 'nextjs-cors';

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
    origin: true
  })
)

interface Success {
  status: 'success'
}

declare module 'http' {
  interface IncomingHttpHeaders {
    "method": string
    "email"?: string
    "password"?: string
    "name"?: string
    "type"?: string
    "country"?: string
    "address"?: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Success | Error | MongooseAccountInterface>
) {
  const mongooseConnection = async () => {
    await mongoose.connect(process.env.MONGODB_STRING);
  };
  await NextCors(req, res, {
    methods: ['GET'],
    origin: true,
  });

  const headers = req.headers;
  const method = req.headers.method;

  // Error Constructors and Functions
  const insufficientHeaders: any = () => {
    const payload: Error = {
      name: "Insufficient Headers",
      message: "Bad Request - Client Error"
    };

    return res.status(400).json(insufficientHeaders)
  }

  const handleError = (name: string, message: string) => {
    const payload: Error = {
      name,
      message
    };

    return res.status(400).json(insufficientHeaders)
  }

  if (!method) {
    insufficientHeaders()
  }

  await mongooseConnection();

  switch (method) {
    case "change":
      if (!headers.id) return res.status(400).json({ name: "Account ID not provided", message: "Bad Request - Client Error" })

      if (!(headers.type == 'country' || headers.type == 'address')) return res.status(400).json({ name: "Invalid Change Type Header", message: "Bad Request - Client Error" })

      if (headers.type == 'country') {
        if (!headers.country) return res.status(400).json({ name: "Country not provided", message: "Bad Request - Client Error" })

        AccountSchema.findOneAndUpdate({
          _id: headers.id
        }, {
          country: headers.country
        }).exec((error, result) => {
          if (error) return handleError("A Server Error Occurred", "Database Error")

          return res.status(200).json({ status: "success" })
        })
      } else if (headers.type == 'address') {
        AccountSchema.findOneAndUpdate({
          _id: headers.id
        }, {
          address: headers.address
        }).exec((error, result) => {
          if (error) return handleError("A Server Error Occurred", "Database Error")

          return res.status(200).json({ status: "success" })
        })
        if (!headers.address) return res.status(400).json({ name: "Address not provided", message: "Bad Request - Client Error" })
      }

      break;
      
    case "create":
      if (!headers.email || !headers.password || !headers.name) return insufficientHeaders();

      const accountBody: AccountInterface = {
        name: headers.name,
        email: headers.email,
        password: headers.password,
        orders: [],
        createdOn: Date(),
        address: "",
        country: ""
      }

      AccountSchema.create(accountBody, (error, result) => {
        if (error) return handleError("A Server Error Occurred", "Database Error")
        return res.status(200).json({
          status: "success"
        })
      })
      break;

    case "login":
      if (!headers.email || !headers.password) return insufficientHeaders();

      AccountSchema.findOne({
        email: headers.email,
        password: headers.password
      }).exec((error, result) => {
        if (error) return handleError("A Server Error Occurred", "Database Error")
        if (result) {
          const resultBody: MongooseAccountInterface = {
            name: result.name,
            email: result.email,
            password: result.password,
            orders: result.orders,
            createdOn: result.createdOn,
            address: result.address,
            country: result.country,
            _id: result._id.toString()
          }
          return res.status(200).json(resultBody)
        } else {
          return handleError("Incorrect Login Information", "Account with this email and password was not found");
        }
      })
      break;
  }
}
