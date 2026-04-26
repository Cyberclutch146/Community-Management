import { NextRequest, NextResponse } from "next/server";
import { sendOTPEmail } from "@/services/emailService";

export async function POST(req: NextRequest) {
  try {
    const { email, code, eventTitle } = await req.json();

    if (!email || !code || !eventTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await sendOTPEmail(email, code, eventTitle);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("OTP API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
