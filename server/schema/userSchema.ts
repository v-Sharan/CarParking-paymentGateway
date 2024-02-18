import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "User Name is important"],
      unique: [true, "User already exists"],
    },
    clerkId: {
      type: String,
      required: [true, "clerkid is need to authendicate"],
      unique: [true, "Clerkid must be unique"],
    },
    email: {
      type: String,
      required: [true, "Email id is required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: false,
    },
    currentbookingId: { type: mongoose.Types.ObjectId, ref: "Payment" },
    bookingHistory: [{ type: mongoose.Types.ObjectId, ref: "booking" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
