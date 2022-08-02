import { NextApiRequest, NextApiResponse } from 'next'

import AccountSchema from '../../schemas/AccountSchema'
import ItemSchema from '../../schemas/ItemSchema'
import { MongooseAccountInterface } from '../../interfaces/account'
import SellerSchema from '../../schemas/SellerSchema'
import handleError from '../../hooks/server/handleError'
import insufficientHeaders from '../../hooks/server/insufficientHeaders'
import mongoose from 'mongoose'

declare module 'http' {
    interface IncomingHttpHeaders {
        "method": string;
        "email": string;
        "password": string;
        "country": string;
        "orders": string;
        "address": string;
        "_id": string;
    }
}

export default async function AccountHandler(req: NextApiRequest, res: NextApiResponse) {
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
        case "login":
            if (!headers.email || !headers.password) return insufficientHeaders(req, res);

            AccountSchema.findOne({
                email: headers.email,
                password: headers.password,
            }).lean().exec((error, result) => {
                if (error) return handleError(req, res, error);

                if (result) {
                    if (result.password !== headers.password) return res.status(400).json({
                        error: "Incorrect Password for account",
                        message: "Incorrect Password for account"
                    })
                    
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
        case "signup":
            if (!headers.email || !headers.password || !headers.name || !headers.country || !headers.address) return insufficientHeaders(req, res);

            AccountSchema.create({
                name: headers.name,
                email: headers.email,
                password: headers.password,
                orders: [],
                createdOn: Date(),
                address: "",
                country: "",
            }, (error, result) => {
                if (error) return handleError(req, res, error);

                return res.status(200).end('Success')
            })
            break;
    }
}