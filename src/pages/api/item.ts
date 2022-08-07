import { ItemInterface, MongooseItemInterface } from '../../interfaces/Item'
import { NextApiRequest, NextApiResponse } from 'next'

import AccountSchema from '../../schemas/AccountSchema'
import ItemSchema from '../../schemas/ItemSchema'
import { MongooseAccountInterface } from '../../interfaces/Account'
import SellerSchema from '../../schemas/SellerSchema'
import handleError from '../../hooks/server/handleError'
import insufficientHeaders from '../../hooks/server/insufficientHeaders'
import mongoose from 'mongoose'

declare module 'http' {
    interface IncomingHttpHeaders {
        "method": string;
        "_id": string;
        "title": string;
        "description": string;
        "brand": string;
        "category": string;
        "stock": number;
        "seller": string;
        "image": string;
    }
}

export default async function ItemHandler(req: NextApiRequest, res: NextApiResponse) {
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
        case "update":
            // fields that can be updated, only requested. title, description, brand, category and stock, and of course, seller.
            if (!headers._id || !headers.title || !headers.description || !headers.brand || !headers.category || !headers.stock || !headers.seller) return insufficientHeaders(req, res);

            ItemSchema.findById(headers._id).exec((error, result) => {
                if (error) return handleError(req, res, error);

                if (result) {
                    const payload: ItemInterface = {
                        title: headers.title,
                        description: headers.description,
                        brand: headers.brand,
                        category: headers.category,
                        stock: headers.stock,
                        sellerId: headers.seller,
                        orders: result.orders,
                        image: result.image
                    }
                    
                    result.update(payload)
                        .then(() => {
                            return res.status(200).end("Success")
                        })
                        .catch((error) => {
                            return res.status(400).json({
                                name: "Error Occurred while trying to update item",
                                message: JSON.stringify(error)
                            })
                        })
                } else return res.status(400).json("No Such Item Found")
            })

            break;
        case "getItem":
            if (!headers._id) return insufficientHeaders(req, res);

            ItemSchema.findById(headers._id).lean().exec((error, result) => {
                if (error) return handleError(req, res, error);

                if (result) {
                    const item: MongooseItemInterface = {
                        ...result,
                        _id: result._id.toString()
                    }

                    return res.status(200).json(item)
                } else return res.status(400).end("No Such Item Found")
            })
            break;
        case "delete":
            if (!headers.seller || !headers._id) return insufficientHeaders(req, res);

            SellerSchema.findById(headers.seller).exec((error, seller) => {
                if (error) return handleError(req, res, error);

                if (seller) {
                    ItemSchema.findById(headers._id).exec(async (error, result) => {
                        if (result) {
                            if (error) return handleError(req, res, error);

                            const itemToBeRemoved = headers._id

                            let arrayOfItems = seller.toJSON().items

                            arrayOfItems = arrayOfItems.filter(e => e !== itemToBeRemoved)

                            await seller.updateOne({
                                items: arrayOfItems
                            })

                            result.delete((error) => {
                                if (error) return handleError(req, res, error);

                                return res.status(200).end("Successfully removed " + headers._id)
                            })
                        } else return res.status(400).end("Error: No Such Item Exists")
                    })
                } else {
                    return res.status(400).json("No Such Seller Account Found")
                }
            })
            break;
        case "get":
            if (!headers.seller) return insufficientHeaders(req, res);

            SellerSchema.findById(headers.seller).exec((error, result) => {
                if (error) return handleError(req, res, error);

                if (result) {
                    if (!result.items.length) return res.status(200).json([])

                    ItemSchema.find().where('_id').in(result.items).lean().exec((error, items) => {
                        if (error) return handleError(req, res, error);

                        return res.status(200).json(items);
                    })
                } else {
                    return res.status(400).json("No Such Seller Account Found")
                }
            })
            break;
        case "getAll":
            ItemSchema.find({}).lean().exec((error, result) => {
                if (error) return handleError(req, res, error);

                return res.status(200).json(result);
            })
            break;
        case "set":
            if (!headers.seller || !headers.title || !headers.brand || !headers.category || !headers.description || !headers.image) return insufficientHeaders(req, res)

            ItemSchema.create({
                sellerId: headers.seller,
                title: headers.title,
                brand: headers.brand,
                category: headers.category,
                description: headers.description,
                stock: 0,
                orders: [],
                image: headers.image
            }).then((result) => {
                SellerSchema.updateOne({
                    _id: headers.seller
                }, {
                    $push: {
                        "items": result._id.toString()
                    }
                }).then((seller) => {
                    return res.status(200).json(result.toJSON())
                }).catch(error => res.status(400).json({ error: "Mongoose Error", message: JSON.stringify(error) }))
            }).catch((error) => {
                return res.status(400).json({
                    error: "Mongoose Error",
                    message: JSON.stringify(error)
                })
            })

            break;
    }
}