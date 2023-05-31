import { NextResponse } from "next/server";

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = isProduction
    ? ['https://www.yoursite.com', 'https://yoursite.com',]
    : ['http://localhost:3000'];

export function middleware(request: Request) {
    const origin = request.headers.get('origin');
    console.log(origin)

    if ((origin && !allowedOrigins.includes(origin)) ||
        (isProduction && !origin)) {
        return new NextResponse(null, {
            status: 400,
            statusText: 'Bad Request',
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }

    console.log('Middleware');

    console.log(request.method)
    console.log(request.url)

    return NextResponse.next();

}

export const config = {
    matcher: '/api/:path*'
}
