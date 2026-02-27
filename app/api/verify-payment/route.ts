import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { orderID } = await req.json()

  // Here you should verify with PayPal API
  // For now we simulate verification

  if (!orderID) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  return NextResponse.json({
    success: true,
    token: {
      orderID,
      unlocked: true,
      timestamp: Date.now(),
    },
  })
}
