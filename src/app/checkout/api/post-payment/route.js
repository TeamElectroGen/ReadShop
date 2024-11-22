import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export const POST = async (request) => {
  const db = await connectDB();
  const paymentData = await request.json();
  const paymentCollection = db.collection("payments");
  const userCollection = db.collection("users");
  if (!paymentData) {
    return NextResponse.json({ error: "Payment data is required" });
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const user = await userCollection.findOne({
    _id: new ObjectId(paymentData.userId.toString()),
  });
  try {
    const result = await paymentCollection.insertOne(paymentData);
    if (result.insertedId) {
      if (user) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Payment Successful",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2c3e50;">Payment Confirmation</h2>
              <p style="color: #34495e;">Dear Customer,</p>
              <p style="color: #34495e;">Your payment has been successfully processed. Thank you for your purchase!</p>
              <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <p style="margin: 5px 0;">Transaction ID: ${paymentData.txnId}</p>
                <p style="margin: 5px 0;">Amount: $${paymentData.totalPrice}</p>
                <p style="margin: 5px 0;">Date: ${new Date().toLocaleString()}</p>
              </div>
              <p style="color: #34495e;">If you have any questions, please don't hesitate to contact us.</p>
              <p style="color: #34495e;">Best regards,<br>ReaShop Team</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
      }
    }
    return NextResponse.json({
      message: "Payment created successfully",
      ...result,
    });
  } catch (error) {
    console.log(error);
    // send mail to the user about the error
    if (user) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Payment Failed",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c3e50;">Payment Confirmation</h2>
            <p style="color: #34495e;">Dear Customer,</p>
            <p style="color: #34495e;">We regret to inform you that your payment has failed. Please try again or <a href="https://readshop.vercel.app/contact-us">contact</a> our support team for assistance.</p>
          </div>
        `,
      };
      await transporter.sendMail(mailOptions);
    }
    return NextResponse.json({ error: "Failed to create payment" });
  }
};
