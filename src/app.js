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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use(cookieParser());

// ! Route setup
import userRouter from "./routes/user.route.js";

app.use("/api/v1/users", userRouter);

// ! Error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).json({ message });
    next();
  }
});
export { app };
