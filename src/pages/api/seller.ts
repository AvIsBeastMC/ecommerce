import { NextApiRequest, NextApiResponse } from 'next'

import SellerSchema from '../../schemas/SellerSchema'
import handleError from '../../hooks/server/handleError'
import insufficientHeaders from '../../hooks/server/insufficientHeaders'
import mongoose from 'mongoose'

export default async function SellerHandler(req: NextApiRequest, res: NextApiResponse) {
    const headers = req.headers
    const method = headers.method

    const mongooseConnection = async () => {
        await mongoose.connect(process.env.MONGODB_STRING)
    }

    if (!method) {
        return insufficientHeaders(req, res)
    }

    await mongooseConnection();

    switch (method) {
        case "new":
            if (!headers.name || !headers.email || !headers.password) return insufficientHeaders(req, res)

            SellerSchema.create({
                name: headers.name,
                email: headers.email,
                password: headers.password,
                joinedOn: Date(),
                items: [],
                orders: []
            }, (error, result) => {
                if (error) return handleError(req, res, error)

                return res.status(200).end("Success")
            })

            break;
        case "get":
            if (!headers.email || !headers.password) return insufficientHeaders(req, res)

            SellerSchema.findOne({
                email: headers.email,
                password: headers.password
            }).lean().exec((error, result) => {
                if (error) handleError(req, res, error)

                if (result) {
                    res.status(200).json(result)
                } else {
                    const payload = {
                        error: "Account does not exist",
                        message: "No such account with the provided credentials exist"
                    }

                    res.status(400).json(payload)
                }
            })
            break;
    }
}