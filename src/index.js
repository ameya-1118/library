import express from "express";
import cors from "cors";
import "./config.js";
import mongoose from "mongoose";
import userRouter from "./router/user.router.js";
import bookRouter from "./router/book.router.js";
import authorRouter from "./router/author.router.js";
import { seedLibraryData } from "./seed/library.seed.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://library-frontend-qkmr.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

const port = process.env.PORT || 8000;
const db = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME || "atlast";

mongoose
  .connect(db, { dbName })
  .then(async () => {
    console.log(`Database connected (${dbName})`);
    await seedLibraryData();
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/author", authorRouter);

app.get("/", (req, res) => {
  res.send("Library API is running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});