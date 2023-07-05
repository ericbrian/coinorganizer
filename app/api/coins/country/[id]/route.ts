import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/prisma/client";

export async function GET(req: Request, { params }: any) {
  const country_id = params.country_id;
  try {
    const data = await prisma.coin.findMany({
      where: {
        country: {
          id: country_id
        }
      },
      include: {
        image: true,
        ruler: true,
        period: true,
        coin_mint: {
          include: {
            mint: true
          }
        }
      },
      orderBy: [
        { face_value: 'asc' },
        { year_start: 'asc' }
      ]
    });
    return NextResponse.json(data);
  }
  catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
      console.log('e.code', e.code)
    }
    throw e
  }
}
