import { PrismaClient } from '@prisma/client'
import { shape as shapeDb } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: any) {
  try {
    const shapes: shapeDb[] = await prisma.shape.findMany({
      where: {
        id: parseInt(params.id)
      }
    });
    if (shapes.length === 0) return null;
    return NextResponse.json(shapes[0]);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
