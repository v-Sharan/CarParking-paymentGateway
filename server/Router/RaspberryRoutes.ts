import { Router, Request, Response, NextFunction } from "express";
import data from "../database.json";

const router = Router();

router.get("/ras", (req: Request, res: Response, next: NextFunction) => {
  const { available, parked, lastUpdate, reserved, soltData } = data;
  res.json({ available, parked, lastUpdate, reserved, soltData });
});

export default router;
