import { convertToPrismaCurrencyCreateInput } from '@/utils';
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const payload = await req.json();
    const data = convertToPrismaCurrencyCreateInput(payload);
    console.log(payload);

    try {
        return await prisma.currency.create({ data });
    }
    catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
            }
        }
        throw e
    }
}
