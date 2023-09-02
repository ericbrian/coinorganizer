import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { period as PeriodType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const periods: PeriodType[] = await prisma.period.findMany();
    return NextResponse.json(periods);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
