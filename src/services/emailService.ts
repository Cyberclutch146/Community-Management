import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async (to: string, message: string) => {
  return transporter.sendMail({
    from: `"Campaign Team" <${process.env.EMAIL}>`,
    to,
    subject: "You're invited to support a campaign",
    text: message
  });
};
