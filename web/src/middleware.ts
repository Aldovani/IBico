import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return NextResponse.next({
    headers: request.headers,
    request: {
      headers: new Headers({
        'x-url': request.url,
      }),
    },
  })
}