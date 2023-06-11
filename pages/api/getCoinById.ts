import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = req.query;
        let { id: coinId } = query;

        if (coinId) {
            const data = await prisma.coin.findFirst({
                where: {
                    id: +coinId
                },
                include: {
                    image: true,
                    country: true,
                    ruler: true,
                    period: true
                }
            });
            return res.status(200).json(data);
        }
        return res.status(400);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
