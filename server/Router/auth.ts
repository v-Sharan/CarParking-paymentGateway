import { Router, Request, Response } from "express";
import { User } from "../schema/userSchema";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { clerkId, username, email } = req.body;
  console.log(clerkId, username, email);
  const user = await User.findOne({ clerkId });
  if (!user) {
    const newUser = await User.create({
      clerkId,
      email,
      username,
    });
    await newUser.save();
    res.json({ message: "user created succesfully" });
  } else {
    res.json({ user });
  }
});

export default router;
