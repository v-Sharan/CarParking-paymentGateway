import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PublicSlotSchema = new Schema(
  {
    available: {
      type: Number,
    },
    reserved: {
      type: Number,
    },
    parked: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Parking = mongoose.model("Public", PublicSlotSchema);
