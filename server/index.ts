import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { config } from "dotenv";
import { ConnectDB } from "./schema/connection";

import RaspberryRoutes from "./Router/RaspberryRoutes";
import AuthRoutes from "./Router/auth";
import SlotRoutes from "./Router/SlotRoutes";
import PaymentRoutes from "./Router/payment";
import HistoryRoutes from "./Router/history";

config();

const server = express();

server.use("/qrcode", express.static(path.join("qrcode")));

server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

const port = process.env.PORT ?? 8000;
const url = process.env.MONGODB_URL ?? "";

server.use("/api", RaspberryRoutes);
server.use("/auth", AuthRoutes);
server.use("/slot", SlotRoutes);
server.use("/payment", PaymentRoutes);
server.use("/his", HistoryRoutes);

const StartServer = () => {
  try {
    ConnectDB(url);
    server.listen(port, () => {
      console.log("http://localhost:8000");
    });
  } catch (e: any) {
    console.log(`Error ${e}`);
  }
};

StartServer();
