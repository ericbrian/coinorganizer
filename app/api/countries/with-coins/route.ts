import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const countries = await prisma.$queryRaw`SELECT * FROM public.v_countries_with_coins ORDER BY short_name`;
    return NextResponse.json(countries);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
