import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const coins = await prisma.$queryRaw`
            SELECT c.common_name,c.pretty_face_value,c.id,c.year_start,c.year_end,co.name AS country_name
            FROM public.coin as c
                LEFT JOIN public.image AS i ON c.id = i.coin_id
                LEFT JOIN public.country AS co ON c.country_id = co.id
            WHERE i.url IS NULL
            ORDER BY co.short_name ASC, c.year_start ASC, c.year_end ASC
            `;
    return NextResponse.json(coins);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
