import prisma from "@/prisma/client";
import { mint as mintDb } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const mints: mintDb[] = await prisma.mint.findMany({
      orderBy: { mint: "asc" }
    });
    return NextResponse.json(mints);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
