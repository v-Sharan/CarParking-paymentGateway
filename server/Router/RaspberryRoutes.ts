import { Router, Request, Response, NextFunction } from "express";
import data from "../database.json";
import { Parking } from "../schema/parkingSchema";

const router = Router();

router.get("/ras", async (req: Request, res: Response, next: NextFunction) => {
  const parking = await Parking.find({});
  res.json({ parking });
});

export default router;
