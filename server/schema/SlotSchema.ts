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
    status: {
      type: String,
      required: [true, "Free column is required"],
    },
  },
  { timestamps: true }
);

export const Slot = mongoose.model("Slot", SlotSchema);

// data = {
//   slots: []
// }
