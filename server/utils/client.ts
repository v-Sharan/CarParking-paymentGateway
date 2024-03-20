import Razorpay from "razorpay";
import * as dotenv from "dotenv";

dotenv.config();

export const client = new Razorpay({
  key_id: process.env.RAZOPAY_KEYID!,
  key_secret: process.env.RAZOPAY_KEYSECRET,
});
