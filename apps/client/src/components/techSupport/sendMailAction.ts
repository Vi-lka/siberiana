"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

export default async function (data: any) {
  await transporter.sendMail({
    from: "",
    to: "",
    subject: "",
    text: JSON.stringify(data),
  });
}
