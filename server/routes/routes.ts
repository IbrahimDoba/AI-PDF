import { Router, Request, Response, response } from "express";
import mongoose from "mongoose";
import Pdf from "../schema/pdfDetails";
const router = Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const pdfparse = require("pdf-parse");
const officeParser = require("officeparser");
const { RunPrompt } = require("../src/openai");

let globalPdfText: string;
let pdfFileName: string;
// MUTLER
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "./files");
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now();
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

interface MulterRequest extends Request {
  file: any;
}

const filePath = path.join(__dirname, "cat text.docx");

const pdfFile = fs.readFileSync(filePath);
const fileDocPath = path.join(__dirname, "cat text.docx");

// ROUTES
router.get("/", (req: Request, res: Response) => {
  res.send("AI RUNNING");
});

router.post("/ai", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

router.get("/test", (req: Request, res: Response) => {
  officeParser.parseOffice(fileDocPath, function (data: any, err: any) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
  });
  // pdfparse(pdfFile)
  //   .then(function (data: any) {
  //     console.log(data.text);
  //   })
  //   .catch(function (error: any) {
  //     console.error("Error parsing PDF:", error);
  //     // Handle the error and send an error response back to the client
  //     res.status(500).send("Internal Server Error");
  //   });
});
router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const title = req.body.title;
    const fileName = (req as MulterRequest).file.filename;
    pdfFileName = fileName;
    console.log("TEST DATA", title, fileName);

    const uploadedDocPath = path.join(__dirname, fileName);

    // console.log(fileName)
    try {
      officeParser.parseOffice(
        uploadedDocPath,
        async function (data: any, err: any) {
          if (err) {
            console.log(err);
            return;
          }
          console.log(data);
          globalPdfText = data;

          // console.log(paresedRes);
          //  res.json({ message: paresedRes });
        }
      );
      // const newPdf = new Pdf({ title, pdf: fileName });
      // await newPdf.save();
    } catch (error) {
      res.json({ stauts: "NOT WORKING OOO" });
    }
  }
);
router.post("/question", async (req: Request, res: Response) => {
  const question = req.body.question;
  try {
    if (!question) {
      return res.status(400).json({ error: "question is required" });
    }
    if (!globalPdfText) {
      return res.status(400).json({ error: "PDF/DOC is required" });
    }

    console.log(question);
    // const parsedRes = await RunPrompt(globalPdfText, question);

    // const newPdf = new Pdf({ aiAnswer: parsedRes, fileName: pdfFileName });
    // console.log(newPdf);
    // await newPdf.save();
    res.json("parsedRes");
  } catch (err) {}
});
// get the info

router.get("/getChats", async (req: Request, res: Response) => {
  const fileName = pdfFileName;
  const aiChats = await Pdf.find({ fileName: fileName });
  console.log("AI CHATS HERE",aiChats)
  res.json(aiChats)
});

module.exports = router;
