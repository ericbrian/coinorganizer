import { convertToPrismaPeriodCreateInput } from '@/utils';
import { PrismaClient, period as PeriodType } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const data = convertToPrismaPeriodCreateInput(payload);
  try {
    const period: PeriodType = await prisma.period.create({ data });
    return NextResponse.json(period);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
