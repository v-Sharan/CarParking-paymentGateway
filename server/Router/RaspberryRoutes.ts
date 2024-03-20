import { Router, Request, Response, NextFunction } from "express";
import { Parking } from "../schema/parkingSchema";
import { Slot } from "../schema/SlotSchema";

const router = Router();

router.get("/ras", async (req: Request, res: Response, next: NextFunction) => {
  const parking = await Parking.find({});
  res.json({ parking });
});

router.get("/slot", async (req: Request, res: Response, next: NextFunction) => {
  const Slots = await Slot.find({});
  res.json({ Slots });
});

export default router;
