"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.FEEDBACK_MAIL_HOST,
  port: +(process.env.FEEDBACK_MAIL_PORT || 465),
  secure: true,
  auth: {
    user: process.env.FEEDBACK_MAIL_USER,
    pass: process.env.FEEDBACK_MAIL_PASS,
  },
});

export async function sendMailAction(data: {
  name: string;
  email: string;
  reason: string;
  text: string;
}) {
  transporter
    .sendMail({
      to: process.env.FEEDBACK_MAIL_TO,
      subject: "feedback",
      text: `Имя: ${data.name}\nE-mail: ${data.email}\nПричина обращения: ${data.reason}\nТекст обращения: ${data.text}`,
    })
    .catch((err) => {
      console.log(err);
    });
}
