import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "User Id is important"],
      unique: [true, "User already exists"],
    },
    orderId: {
      type: String,
      required: [true, "Order Id is important"],
      unique: [true, "OrderId already exists"],
    },
    slot: [
      {
        type: { type: mongoose.Types.ObjectId, ref: "Slot" },
      },
    ],
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", BookingSchema);
