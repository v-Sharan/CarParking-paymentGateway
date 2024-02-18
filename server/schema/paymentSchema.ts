import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "UserId is important"],
    },
    orderId: {
      type: String,
      required: [true, "orderId is important"],
    },
    verify: {
      type: Boolean,
      required: [true, "verify initially false"],
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", PaymentSchema);
