// import { Router, Request, Response, response } from "express";
const Pdf = require("../schema/pdfDetails");

const path = require("path");
const officeParser = require("officeparser");
const { saveMessage } = require("../src/saveFile");
const { Indexes } = require("../src/LangChain");
const { QueryText } = require("../src/UseStore");

const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("../src/JWT");
// const cookieParser = require ("cookie-parser")

let globalPdfText: any;
let pdfFileName: any;
// let destinationPath:any = "./uploads"
// MUTLER


interface MulterRequest extends Request {
  file: any;
}

// const filePath = path.join(__dirname, "cat text.docx");

// const pdfFile = fs.readFileSync(filePath);
// const fileDocPath = path.join(__dirname, "cat text.docx");

// AUTH ROUTES

// ROUTES
const uploadDoc = async (req: any, res: any) => {
    // console.log(req)
   const fileName = (req as MulterRequest).file.filename;
  
    console.log(fileName)
    if (fileName === undefined) {
      res.send("no file");
    }
    pdfFileName = fileName;
    console.log("TEST DATA",  pdfFileName);

    const uploadedDocPath = path.join("./files", fileName);
    console.log("filepath", uploadedDocPath);
    const IndexFileName = fileName + ".txt";
    // console.log(fileName)
    try {
      officeParser.parseOffice(
        uploadedDocPath,
        async function (data: any, err: any) {
          if (err) {
            res.send("err");
            console.log(err);
            return;
          }
          // console.log(data);
          res.send("sucess");
          globalPdfText = data;
          saveMessage(globalPdfText, fileName);
          Indexes(IndexFileName);
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
const question = async (req: any, res: any) => {
  // QueryText()

  const question = req.body.question;
  const fileName = req.body.file;
  console.log("FIleName", fileName);

  try {
    // if (!question) {
    //   return res.status(400).json({ error: "question is required" });
    // }
    // if (!globalPdfText) {
    //   return res.status(400).json({ error: "PDF/DOC is required" });
    // }

    console.log(question);
    const aiAns = await QueryText(question);

    res.json(" Sucess Answer");
    console.log("AiText", aiAns);
    const newPdf = new Pdf({
      aiAnswer: aiAns,
      fileName: fileName,
      aiQuestion: question,
    });

    console.log(newPdf);
    await newPdf.save();

    res.json("parsedRes");
  } catch (err) {}
};
// get the info

const getChats = async (req: any, res: any) => {
  const fileTitleName = req.query.fileNameTitle;
  console.log(fileTitleName);

  const aiChats = await Pdf.find({ fileName: fileTitleName });
  console.log("AI CHATS HERE", aiChats);
  res.json(aiChats);
};

const deleteChats = async (req: any, res: any) => {
  const chatsToDelete = req.params.name;
  console.log("PARAMS",req.params);
  console.log(chatsToDelete);
  const deletePdf = await Pdf.deleteMany({ fileName: chatsToDelete });
  res.status(200).json({ message: "deleted" });
  console.log(deletePdf);
};

module.exports = {
  uploadDoc,
  question,
  getChats,
  deleteChats,
};
export {};
