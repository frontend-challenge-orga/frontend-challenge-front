import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  return NextResponse.json({ message: "POST /api/checkout" });
};
