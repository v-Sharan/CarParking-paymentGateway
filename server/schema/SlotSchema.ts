import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SlotSchema = new Schema(
  {
    pid: {
      type: Number,
      required: [true, "Slot number Id is important"],
    },
    floor: {
      type: Number,
      required: [true, "Floor is required to display"],
    },
    free: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Slot = mongoose.model("Slot", SlotSchema);
