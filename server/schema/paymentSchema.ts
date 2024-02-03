import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "User Name is important"],
    },
    orderId: {
      type: String,
      required: [true, "orderId is important"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", PaymentSchema);
