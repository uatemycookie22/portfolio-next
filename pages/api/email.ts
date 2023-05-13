import {NextApiRequest, NextApiResponse} from "next";

const minMessageLength = 8
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {body}: {body: string} = req.body

    if (body.length < minMessageLength) {
        res.status(400).json({error: 'Message must be 8 characters or longer.'})
    }

    res.status(200).end()
}