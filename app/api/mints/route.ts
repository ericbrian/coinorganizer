import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { mint as mintDb } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const mints: mintDb[] = await prisma.mint.findMany({
      orderBy: { mint: "asc" },
      include: { country_mint: true }
    });
    return NextResponse.json(mints);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
