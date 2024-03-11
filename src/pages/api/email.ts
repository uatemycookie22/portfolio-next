import {NextApiRequest, NextApiResponse} from "next";
import {pb} from "@api-config/pocketbase";
import {ClientResponseError} from "pocketbase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {body, address}: {body: string, address: string} = req.body

    try {
        const record = await pb.collection('messages').create({
            message: body,
            from: address,
        })
        console.log(record)

        res.status(200).end()
    } catch (error) {
        if (error instanceof Error) {
            console.error(error)

            if (isClientResponseError(error)) {
                const {message: pbMessage} = Object.entries(error.response.data)[0][1] as {message: string}
                res.status(error.response.code).json({error: pbMessage})
            }
        }

        res.status(500).end()
    }
}

function isClientResponseError(error: Error): error is ClientResponseError {
    return 'url' in error && 'response' in error && 'data' in error
}