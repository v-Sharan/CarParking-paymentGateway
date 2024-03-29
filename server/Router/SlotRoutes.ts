import { Router, Request, Response, NextFunction } from "express";
import { Slot } from "../schema/SlotSchema";

const router = Router();

router.post("/create", async (req: Request, res: Response) => {
  const { floor, pid } = req.body;
  const body = { floor, pid, status: "free" };
  console.log(body);
  const slot = await Slot.create(body);
  slot.save();
  res.json({ slot });
});

router.get("/", async (req: Request, res: Response) => {
  const slot = await Slot.find({});
  res.json({ slot });
});

export default router;
