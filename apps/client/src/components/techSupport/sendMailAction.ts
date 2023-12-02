"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

export async function sendMailAction(data: any) {
  await transporter.sendMail({
    from: "",
    to: "",
    subject: "",
    text: JSON.stringify(data),
  });
}
