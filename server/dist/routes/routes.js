"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Pdf = require("../schema/pdfDetails");
const router = (0, express_1.Router)();
const multer = require("multer");
const path = require("path");
const officeParser = require("officeparser");
const { RunPrompt } = require("../src/openai");
let globalPdfText;
let pdfFileName;
// MUTLER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
// const filePath = path.join(__dirname, "cat text.docx");
// const pdfFile = fs.readFileSync(filePath);
// const fileDocPath = path.join(__dirname, "cat text.docx");
// ROUTES
router.get("/", (req, res) => {
    res.send("AI RUNNING");
});
router.post("/ai", (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
});
router.post("/upload", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const fileName = req.file.filename;
    if (fileName === undefined) {
        res.send("no file");
    }
    pdfFileName = fileName;
    console.log("TEST DATA", title, fileName);
    const uploadedDocPath = path.join("./files", fileName);
    console.log("filepath", uploadedDocPath);
    // console.log(fileName)
    try {
        officeParser.parseOffice(uploadedDocPath, function (data, err) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.send("err");
                    console.log(err);
                    return;
                }
                console.log(data);
                res.send("sucess");
                globalPdfText = data;
                // console.log(paresedRes);
                //  res.json({ message: paresedRes });
            });
        });
        // const newPdf = new Pdf({ title, pdf: fileName });
        // await newPdf.save();
    }
    catch (error) {
        res.json({ stauts: "NOT WORKING OOO" });
    }
}));
router.post("/question", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const question = req.body.question;
    try {
        if (!question) {
            return res.status(400).json({ error: "question is required" });
        }
        if (!globalPdfText) {
            return res.status(400).json({ error: "PDF/DOC is required" });
        }
        console.log(question);
        const parsedRes = yield RunPrompt(globalPdfText, question);
        const newPdf = new Pdf({ aiAnswer: parsedRes, fileName: pdfFileName });
        console.log(newPdf);
        yield newPdf.save();
        res.json("parsedRes");
    }
    catch (err) { }
}));
// get the info
router.get("/getChats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = pdfFileName;
    const aiChats = yield Pdf.find({ fileName: fileName });
    console.log("AI CHATS HERE", aiChats);
    res.json(aiChats);
}));
router.delete("/deleteChat/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chatsToDelete = req.params.name;
    const deletePdf = yield Pdf.deleteMany({ fileName: chatsToDelete });
    res.status(200).json({ message: "deleted" });
    console.log(deletePdf);
}));
module.exports = router;
