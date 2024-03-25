import { Router, Request, Response, NextFunction } from "express";
import { Slot } from "../schema/SlotSchema";

const router = Router();

router.get("/slot", async (req: Request, res: Response, next: NextFunction) => {
  const Slots = await Slot.find({});
  res.json({ Slots });
});

export default router;
