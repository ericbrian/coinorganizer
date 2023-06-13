import { NextResponse } from "next/server";
import { limiter } from "../config/limiter";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    const origin = request.headers.get('origin');

    const remaining = await limiter.removeTokens(1);
    console.log('remaining', remaining);

    if (!session) {
        return new NextResponse(null, {
            status: 401,
            statusText: "Not Authorized",
            headers: {
                'Access-Control-Allow-Origin': origin ?? '*',
                'Content-Type': 'text/plain'
            }
        })
    }

    if (remaining < 0) {
        return new NextResponse(null, {
            status: 429,
            statusText: "Too Many Reqeusts",
            headers: {
                'Access-Control-Allow-Origin': origin ?? '*',
                'Content-Type': 'text/plain'
            }
        })
    }

    return new Response('hello from next.js', {
        headers: {
            'Access-Control-Allow-Origin': origin ?? '*',
            'Content-Type': 'text/plain',
        }
    })
}
