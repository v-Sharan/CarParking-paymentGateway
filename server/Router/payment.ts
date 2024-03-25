import { Router, Request, Response, NextFunction } from "express";
import { Payment } from "../schema/paymentSchema";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import QRCode from "qrcode";
import { client } from "../utils/client";
import { Slot } from "../schema/SlotSchema";
import { User } from "../schema/userSchema";
import { Booking } from "../schema/bookingSchema";

const router = Router();

router.post("/createOrder", async (req: Request, res: Response) => {
  const { amount } = req.body;
  const order = await client.orders.create({
    amount: amount * 100,
    currency: "INR",
  });
  return res.json({ order });
});

router.post("/verify", async (req: Request, res: Response) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    userId,
    pid,
  } = req.body;
  const isverified = validatePaymentVerification(
    { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
    razorpay_signature,
    process.env.RAZOPAY_KEYSECRET!
  );

  if (!isverified) return res.json({ message: "Something went wrong" });
  const pay = await Payment.create({
    orderId: razorpay_order_id,
    userId,
    verify: true,
  });
  await pay.save();
  const slots = await Slot.findOneAndUpdate({ pid }, { status: "booked" });
  if (!slots) return res.json({ message: "No Slots Available" });
  const qrcode = `/qrcode/${slots._id}.png`;
  await QRCode.toFile(
    `.${qrcode}`,
    JSON.stringify({
      razorpay_order_id,
      userId,
      slot: slots._id,
    })
  );
  console.log(qrcode);
  const Book = await Booking.create({
    orderId: razorpay_order_id,
    userId: userId,
    slot: slots._id,
    qrCode: qrcode,
  });
  await Book.save();
  const user = await User.findOneAndUpdate(
    { clerkId: userId },
    { $push: { bookingHistory: Book._id } }
  );
  return res.json({
    message: `Payment success and Booked slot number ${slots?.pid}`,
    qrcode,
  });
});

export default router;
