import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = req.query;
        let { id: coinId } = query;

        if (coinId) {
            const data = await prisma.coins.findFirst({
                where: {
                    id: +coinId
                },
                include: {
                    Images: true,
                    Countries: true,
                    Rulers: true,
                    Periods: true
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
