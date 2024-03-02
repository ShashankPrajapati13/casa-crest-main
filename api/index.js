import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import contactRouter from "./routes/contact.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://Anmol908:anmol%40123@cluster.dho9xwt.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Database connected successully");
  } catch (error) {
    console.log(error.stack);
    console.log("Error in Connection");
  }
};



const __dirname = path.resolve();

connectDB();

const app = express();

app.use(cors({
  origin: 'https://65e35bb7b5d5f1dd35b80a0b--subtle-moonbeam-15655c.netlify.app',
  credentials: true,
  optionSuccessStatus: 200
}))

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/contact", contactRouter);

app.use(express.static(path.join(__dirname, "/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
