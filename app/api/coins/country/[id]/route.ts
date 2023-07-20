import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { id: number } }) {
  const country_id = params.id;

  try {
    const data = await prisma.coin.findMany({
      where: {
        country: {
          id: Number(country_id)
        }
      },
      include: {
        country: true,
        image: true,
        currency: true,
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
