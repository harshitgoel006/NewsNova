import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

if (process.env.NODE_ENV !== "production") {
  transporter.verify()
    .then(() => console.log("📧 SMTP ready"))
    .catch((err) => console.error("SMTP error:", err.message));
}

const sendEmail = async (to, subject, html) => {
  if (!to) throw new ApiError(400, "Recipient email required");

  try {
    return await transporter.sendMail({
      from: `"NewsNova" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    throw new ApiError(500, "Email sending failed");
  }
};

export default sendEmail;