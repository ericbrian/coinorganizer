import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await prisma.$queryRaw`
            SELECT c.common_name,c.pretty_face_value,c.id,c.year_start,c.year_end,co.name AS country_name
            FROM public.coin as c
                LEFT JOIN public.image AS i ON c.id = i.coin_id
                LEFT JOIN public.country AS co ON c.country_id = co.id
            WHERE i.url IS NULL
            `;

        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
