import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID as string,
  process.env.TWILIO_AUTH as string
);

export const sendSMS = async (phone: string, message: string) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: `+91${phone}` // India format
    });
  } catch (err: any) {
    console.error("SMS failed:", phone, err.message);
    throw err;
  }
};