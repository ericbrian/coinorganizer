import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    let { max } = query;

    let maxResults = max ? +max : 10;
    if (maxResults > 10) maxResults = 10;

    try {
        const data = await prisma.coin.findMany({
            take: maxResults,
            skip: 0,
            orderBy: [
                {
                    created_at: 'desc'
                }
            ],
            include: {
                image: true
            }
        });
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
