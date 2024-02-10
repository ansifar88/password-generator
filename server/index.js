import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generatePassword } from "./controller.js";
dotenv.config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.post("/generate", generatePassword
  
);
app.listen(process.env.PortNumber, () => {
  console.log(`SERVER CONNECTED 
Port Number : ${process.env.PortNumber}`);
});
