import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { country as countryDb } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const countries: countryDb[] = await prisma.country.findMany({
      where: {
        id: parseInt(params.id)
      }
    });
    if (countries.length === 0) return null;
    return NextResponse.json(countries[0]);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
