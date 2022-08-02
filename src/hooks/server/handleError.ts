import { NextApiRequest, NextApiResponse } from 'next'

import mongoose from 'mongoose'

export default function insufficientHeaders (req: NextApiRequest, res: NextApiResponse, error: mongoose.CallbackError) {
    return res.status(400).json({
        error: JSON.stringify(error),
        message: "MongoDB Error"
    })
}