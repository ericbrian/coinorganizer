import { convertToPrismaCoinCreateInput } from "@/utils";

import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(req: Request) {
    const payload = await req.json();
    try {
        const data = convertToPrismaCoinCreateInput(payload);
        return await prisma.coin.create({ data });
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
