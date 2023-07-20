import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
        const data = { ...payload, comments: payload.comments || null };
        const engraver = prisma.engraver.create({ data });
        return new NextResponse(JSON.stringify(engraver), { status: 201 });
    }
    catch (e: any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                const msg = `There is a unique constraint violation: an engraver aleady exists with this 'name'.`;
                return new NextResponse(msg, { status: 400 });
            }
        }
        return new NextResponse(e.message, { status: 500 });
    }
}
