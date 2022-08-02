import { NextApiRequest, NextApiResponse } from 'next'

export default function insufficientHeaders (req: NextApiRequest, res: NextApiResponse) {
    return res.status(400).json({
        error: "Insufficient Headers",
        message: "Insufficient Headers"
    })
}