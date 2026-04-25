import nodemailer from "nodemailer";

const transporter = process.env.EMAIL && process.env.EMAIL_PASS
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    })
  : null;

export const sendEmail = async (to: string, message: string) => {
  if (!transporter) {
    console.warn("Email skipped: Email credentials missing in environment variables.");
    return;
  }
  
  return transporter.sendMail({
    from: `"Campaign Team" <${process.env.EMAIL}>`,
    to,
    subject: "You're invited to support a campaign",
    text: message
  });
};
