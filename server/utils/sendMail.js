"use strict";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendMail = async (fromEmail, toEmail, subject, html, body) => {
  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: subject,
      html: html,
      text: body,
    });
  } catch (error) {
    console.log(error);
  }
};
