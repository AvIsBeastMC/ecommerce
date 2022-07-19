// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import initMiddleware from '../../hooks/initMiddleware'
import Cors from 'cors'
import { ItemInterface, MongooseItemInterface } from '../../interfaces/item'
import mongoose from 'mongoose'
import NextCors from 'nextjs-cors'
import ItemSchema from '../../schemas/ItemSchema'

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
    "sellerId"?: string
    "id"?: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Success | Error | MongooseItemInterface>
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

    return res.status(400).json(payload)
  }

  const handleError = (name: string, message: string) => {
    const payload: Error = {
      name,
      message
    };

    return res.status(400).json(payload)
  }

  if (!method) {
    insufficientHeaders()
  }

  await mongooseConnection();

  switch (method) {
    case "get":
      if (!headers.id) return insufficientHeaders();

      ItemSchema.findOne({
        _id: headers.id
      }).exec((error, result) => {
        if (error) return handleError("A Server Error Occurred", "Database Error")

        if (result) {
          const payload: MongooseItemInterface = {
            title: result.title,
            brand: result.brand,
            sellerId: result.sellerId,
            stock: result.stock,
            orders: result.orders,
            _id: result._id.toString()
          }

          return res.status(200).json(payload)
        } else {
          return handleError("Incorrect Item Information", "Item with the provided id doesn't exist");
        }
      })
      break;
    case "new":
      if (!headers.title || !headers.brand || !headers.sellerId || !headers.stock) return insufficientHeaders();

      
      break;
  }
}
