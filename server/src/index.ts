import express, { Application } from "express";
import 'dotenv/config';
import mongoose from "mongoose";
const MyRoutes = require("../routes/routes.ts");
const cors = require("cors")
//For env File

const URI =
  "mongodb+srv://ibrahimdoba55:ibrahim123@authdb.kuauwfm.mongodb.net/AuthDB?retryWrites=true&w=majority";

mongoose.connect(URI, {}).then(() => console.log("Mongo Connceted"));

const app: Application = express();
app.use(express.json())
app.use(cors())
app.use('./files', express.static("files"))

app.use("/", MyRoutes);


const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
