import expressAsyncHandler from "express-async-handler";
import { Office } from "../models/officeModel.js";
import { sendMail } from "../utils/sendMail.js";

export const allOffices = expressAsyncHandler(async (req, res, next) => {
  const offices = await Office.find();

  res.status(200).json({
    status: "success",
    message: "Fetched all offices successfully",
    offices,
  });
});

export const addOffice = expressAsyncHandler(async (req, res, next) => {
  const body = req.body;
  await Office.create(body);

  res.status(200).json({
    status: "success",
    message: "Office added successfully",
  });
});

export const editOffice = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.officeID;
  const body = req.body;
  await Office.findByIdAndUpdate(id, body);

  res.status(200).json({
    status: "success",
    message: "Office updated successfully",
  });
});

export const deleteOffice = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.officeID;

  await Office.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Office deleted successfully",
  });
});

export const sendContactMail = expressAsyncHandler(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  const htmlMessage = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #4CAF50;">You've received a new message from your website!</h2>
      <hr style="border: 1px solid #4CAF50;"/>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr style="border: 1px solid #4CAF50;"/>
      <p>This is an automated message sent from the contact form on your website.</p>
  </div>
`;

  await sendMail(
    email,
    process.env.NODEMAILER_EMAIL,
    subject,
    htmlMessage,
    message
  );

  res.status(200).json({
    status: "success",
    message: "Message sent successfully",
  });
});
