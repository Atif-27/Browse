import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    secure: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// ! Route setup
import userRouter from "./routes/user.route.js";

app.use("/api/v1/users", userRouter);

// ! Error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).json({ message });
    next();
  }
});
export { app };
