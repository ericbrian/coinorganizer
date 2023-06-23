import prisma from "@/prisma/client";
import { period as rulerDb } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const periods: rulerDb[] = await prisma.period.findMany();
    return NextResponse.json(periods);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
