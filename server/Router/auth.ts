import { Router, Request, Response } from "express";
import { User } from "../schema/userSchema";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { clerkId, username, email } = req.body;
  const user = await User.findOne({ clerkId });
  if (!user) {
    const newUser = await User.create({
      clerkId,
      email,
      username,
    });
    await newUser.save();
    res.json({ id: newUser._id });
  } else {
    res.json({ user });
  }
});

export default router;
