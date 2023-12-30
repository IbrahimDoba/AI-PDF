// import { Router, Request, Response, response } from "express";
const  Pdf = require("../schema/pdfDetails");
const express = require("express");
const { Router } = express;
const { Request, Response, response } = express;
const router = Router();
const multer = require("multer");
const path = require("path");
const officeParser = require("officeparser");
const { Ai1 } = require("../src/openai");
const { saveMessage } = require("../src/saveFile");
const { Indexes } = require("../src/LangChain");
const { QueryText } = require("../src/UseStore");

let globalPdfText: any;
let pdfFileName: any;
// let destinationPath:any = "./uploads"
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

// const filePath = path.join(__dirname, "cat text.docx");

// const pdfFile = fs.readFileSync(filePath);
// const fileDocPath = path.join(__dirname, "cat text.docx");

// ROUTES
router.get("/", (req: any, res: any) => {
  res.send("AI RUNNING");
});

router.post("/ai", (req: any, res: any) => {
  res.send("Welcome to Express & TypeScript Server");
});


router.post(
  "/upload",
  upload.single("file"),
  async (req: any, res: any) => {
    const title = req.body.title;
    const fileName = (req as MulterRequest).file.filename;
    if(fileName === undefined){
      res.send("no file")
    }
    pdfFileName = fileName;
    console.log("TEST DATA", title, pdfFileName);

    const uploadedDocPath = path.join("./files", fileName);
    console.log("filepath",uploadedDocPath)
    const IndexFileName = fileName + ".txt"
    // console.log(fileName)
    try {
      officeParser.parseOffice(
        uploadedDocPath,
        async function (data: any, err: any) {
          if (err) {
            res.send("err")
           console.log(err)
            return;
          }
          // console.log(data);
          res.send("sucess")
          globalPdfText = data;
          saveMessage(globalPdfText,fileName)
          Indexes(IndexFileName)
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
router.post("/question", async (req: any, res: any) => {
  // QueryText()

  const question = req.body.question;
  const fileName = req.body.file;
  console.log("FIleName",fileName);
  
  try {
    // if (!question) {
    //   return res.status(400).json({ error: "question is required" });
    // }
    // if (!globalPdfText) {
    //   return res.status(400).json({ error: "PDF/DOC is required" });
    // }

    console.log(question);
    const aiAns = await QueryText(question) 
    
    res.json(" Sucess Answer")
    console.log("AiText",aiAns)
    const newPdf = new Pdf({ aiAnswer: aiAns, fileName: fileName, aiQuestion: question });

    console.log(newPdf);
    await newPdf.save();
   
    res.json("parsedRes");
  } catch (err) {}
});
// get the info

router.get("/getChats", async (req: any, res: any) => {
  // const {fileTitleName} = pdfFileName;

  const aiChats = await Pdf.find({ fileName: pdfFileName });
  console.log("AI CHATS HERE",aiChats)
  res.json(aiChats)
});

router.delete("/deleteChat/:name", async (req:any, res:any) => {
  const chatsToDelete = req.params.name;
  const deletePdf = await Pdf.deleteMany({fileName:chatsToDelete})
  res.status(200).json({ message: "deleted" });
  console.log(deletePdf)
})



module.exports = router;
export {}