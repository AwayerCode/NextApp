import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: "Hello, World!",
    data: {
      name: "Next.js App",
      version: "1.0.0"
    }
  })
}