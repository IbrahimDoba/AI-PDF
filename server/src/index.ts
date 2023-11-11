const express = require("express");
require('dotenv').config()
const mongoose = require("mongoose");
const MyRoutes = require("../routes/routes");
const cors = require("cors")
//For env File

const URI =
  "mongodb+srv://ibrahimdoba55:ibrahim123@authdb.kuauwfm.mongodb.net/AuthDB?retryWrites=true&w=majority";

mongoose.connect(URI, {}).then(() => console.log("Mongo Connceted"));

const app = express();
app.use(express.json())
app.use(cors({ origin : "https://ai-pdf-eight.vercel.app" }))

app.use("/", MyRoutes);


const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
