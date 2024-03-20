import { Router, Request, Response, NextFunction } from "express";
import { Payment } from "../schema/paymentSchema";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

import { client } from "../utils/client";

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
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, userId } =
    req.body;
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
  return res.json({ message: "Payment success" });
});

export default router;
