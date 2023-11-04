import mongoose, { Model, Schema } from "mongoose";

interface IPdf extends Document {
  title: string;
  fileName: string;
  aiQuestion: string;
  aiAnswer: aiRes;
}
type aiRes = {
  Q: string;
  A: String;
};

const pdfDetailsSchema = new Schema<IPdf>(
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
const Pdf: Model<IPdf> = mongoose.model("PdfDetails", pdfDetailsSchema);

export default Pdf;
