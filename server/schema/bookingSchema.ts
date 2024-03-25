import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "User Id is important"],
    },
    orderId: {
      type: String,
      required: [true, "Orders Id is important"],
    },
    qrCode: {
      type: String,
      required: [true, "QR code is Required to use in check-in"],
    },
    slot: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", BookingSchema);
