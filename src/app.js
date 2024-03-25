import express from "express";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    secure: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
export { app };
