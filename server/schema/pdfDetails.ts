// const mongoose = require("mongoose");
const mongoose = require("mongoose");

interface IPdf extends Document {
  title: string;
  fileName: string;
  aiQuestion: string;
  aiAnswer: string;
}
// type aiRes = {
//   Q: string;
//   A: String;
// };

const pdfDetailsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    fileName: {
      type: String,
    },
    aiQuestion: {
      type: String,
    },
    aiAnswer: {
      type: Object,
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("PdfDetails", pdfDetailsSchema);

export {}
 // const Pdf: Model<IPdf> = mongoose.model("PdfDetails", pdfDetailsSchema);
// new Schema<IPDF>
// export default Pdf;
// import mongoose, { Model, Schema } from "mongoose";