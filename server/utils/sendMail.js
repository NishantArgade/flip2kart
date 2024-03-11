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

export const sendMail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL, // sender address
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
  }
};
