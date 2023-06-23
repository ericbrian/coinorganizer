import prisma from "@/prisma/client";
import { shape as shapeDb } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const shapes: shapeDb[] = await prisma.shape.findMany();
    return NextResponse.json(shapes);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
