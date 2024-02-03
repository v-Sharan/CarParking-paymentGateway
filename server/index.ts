import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";

import RaspberryRoutes from "./Router/RaspberryRoutes";

config();

const server = express();

server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

const port = process.env.PORT ?? 8000;

server.use("/api", RaspberryRoutes);

server.listen(port, () => {
  console.log("http://localhost:8000");
});
