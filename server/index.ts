import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { ConnectDB } from "./schema/connection";

import RaspberryRoutes from "./Router/RaspberryRoutes";
import AuthRoutes from "./Router/auth";
import SlotRoutes from "./Router/SlotRoutes";

config();

const server = express();

server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

const port = process.env.PORT ?? 8000;
const url = process.env.MONGODB_URL ?? "";

server.use("/api", RaspberryRoutes);
server.use("/auth", AuthRoutes);
server.use("/slot", SlotRoutes);

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
