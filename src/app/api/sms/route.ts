import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
  try {
    const { to, message } = await req.json();

    if (!to || !message) {
      return NextResponse.json(
        { error: "Phone number and message are required." },
        { status: 400 }
      );
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      return NextResponse.json(
        { error: "Twilio credentials missing in .env.local." },
        { status: 500 }
      );
    }

    const client = twilio(accountSid, authToken);

    const sms = await client.messages.create({
      body: message,
      to,
      from: fromNumber,
    });

    return NextResponse.json({
      success: true,
      sid: sms.sid,
    });
  } catch (error) {
    console.error("SMS error:", error);
    return NextResponse.json(
      { error: "Failed to send SMS." },
      { status: 500 }
    );
  }
}