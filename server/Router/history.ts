import { Router, Request, Response, NextFunction } from "express";
import { User } from "../schema/userSchema";
import { Booking } from "../schema/bookingSchema";
const router = Router();

router.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findOne({ clerkId: userId }).populate([
    "bookingHistory",
  ]);
  console.log(user);
  res.json({ history: user?.bookingHistory });
});

export default router;
