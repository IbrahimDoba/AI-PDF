import { Request, Response, NextFunction } from "express";
// package.json   "module": "commonjs", before langchain
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const AiRoutes = require("../routes/aiRoutes");
const AuthRoutes = require("../routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

const cors = require("cors");
const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
};

// middleware
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(loggingMiddleware);

// { origin : "https://ai-pdf-eight.vercel.app" }
// routes
app.use("/api/ai", AiRoutes);
app.use("/api/user", AuthRoutes);

const port = process.env.PORT || 5001;
mongoose.connect(process.env.URI, {}).then(() =>
  app.listen(port, () => {
    console.log(
      `Server is Fire at http://localhost:${port} and mongo conncted`
    );
  })
);
