// import { create } from "domain";

// // import { Router, Request, Response, response } from "express";
// const Pdf = require("../schema/pdfDetails");
// const User = require("../schema/auth");
// const express = require("express");
// const { Router } = express;
// const { Request, Response, response } = express;
// const router = Router();
// const multer = require("multer");
// const path = require("path");
// const officeParser = require("officeparser");
// const { Ai1 } = require("../src/openai");
// const { saveMessage } = require("../src/saveFile");
// const { Indexes } = require("../src/LangChain");
// const { QueryText } = require("../src/UseStore");

// const bcrypt = require("bcrypt");
// const {createTokens, validateToken} = require('../src/JWT')
// // const cookieParser = require ("cookie-parser")

// let globalPdfText: any;
// let pdfFileName: any;
// // let destinationPath:any = "./uploads"
// // MUTLER

// const storage = multer.diskStorage({
//   destination: function (req: any, file: any, cb: any) {
//     cb(null, "./files");
//   },
//   filename: function (req: any, file: any, cb: any) {
//     const uniqueSuffix = Date.now();
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// interface MulterRequest extends Request {
//   file: any;
// }

// // const filePath = path.join(__dirname, "cat text.docx");

// // const pdfFile = fs.readFileSync(filePath);
// // const fileDocPath = path.join(__dirname, "cat text.docx");

// // AUTH ROUTES
// router.post("/login", async (req: any, res: any) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   console.log(username);
//   const user = await User.findOne({ username: username });
//   // console.log(user)
//   if (!user) {
//     res.status(400).json({ error: "user does not exist" });
//   }
//   const dbPassword = user.password;
//   bcrypt.compare(password, dbPassword).then((match: any) => {
//     if (!match) {
//       res.status(400).json({ error: "Incorrect Username or Password" });
//     } else {
//       const accessToken = createTokens(user)

//       res.cookie("access-token", accessToken, {
//         maxAge: 60*60*24*30*1000,
//         httpOnly: true, // for security to prevent others from accessing your cookies
//       })

//       res.json("logged In")
//     }
//   });
// });
// router.post("/register", (req: any, res: any) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   console.log(username, password);
//   bcrypt.hash(password, 10).then((hash: any) => {
//     User.create({
//       username: username,
//       password: hash,
//     });
//     console.log("Hashed Password:", hash);
//   });
//   res.json("ggs");
// });
// router.get("/profile", validateToken, (req: any, res: any) => {
// res.json("profile")
// })
// // ROUTES
// router.get("/", (req: any, res: any) => {
//   res.send("AI RUNNING");
// });

// router.post("/ai", (req: any, res: any) => {
//   res.send("Welcome to Express & TypeScript Server");
// });

// router.post("/upload", upload.single("file"), async (req: any, res: any) => {
//   const title = req.body.title;
//   const fileName = (req as MulterRequest).file.filename;
//   if (fileName === undefined) {
//     res.send("no file");
//   }
//   pdfFileName = fileName;
//   console.log("TEST DATA", title, pdfFileName);

//   const uploadedDocPath = path.join("./files", fileName);
//   console.log("filepath", uploadedDocPath);
//   const IndexFileName = fileName + ".txt";
//   // console.log(fileName)
//   try {
//     officeParser.parseOffice(
//       uploadedDocPath,
//       async function (data: any, err: any) {
//         if (err) {
//           res.send("err");
//           console.log(err);
//           return;
//         }
//         // console.log(data);
//         res.send("sucess");
//         globalPdfText = data;
//         saveMessage(globalPdfText, fileName);
//         Indexes(IndexFileName);
//         // console.log(paresedRes);
//         //  res.json({ message: paresedRes });
//       }
//     );
//     // const newPdf = new Pdf({ title, pdf: fileName });
//     // await newPdf.save();
//   } catch (error) {
//     res.json({ stauts: "NOT WORKING OOO" });
//   }
// });
// router.post("/question", async (req: any, res: any) => {
//   // QueryText()

//   const question = req.body.question;
//   const fileName = req.body.file;
//   console.log("FIleName", fileName);

//   try {
//     // if (!question) {
//     //   return res.status(400).json({ error: "question is required" });
//     // }
//     // if (!globalPdfText) {
//     //   return res.status(400).json({ error: "PDF/DOC is required" });
//     // }

//     console.log(question);
//     const aiAns = await QueryText(question);

//     res.json(" Sucess Answer");
//     console.log("AiText", aiAns);
//     const newPdf = new Pdf({
//       aiAnswer: aiAns,
//       fileName: fileName,
//       aiQuestion: question,
//     });

//     console.log(newPdf);
//     await newPdf.save();

//     res.json("parsedRes");
//   } catch (err) {}
// });
// // get the info

// router.get("/getChats", async (req: any, res: any) => {
//   const fileTitleName = req.query.fileNameTitle;
//   console.log(fileTitleName);

//   const aiChats = await Pdf.find({ fileName: fileTitleName });
//   console.log("AI CHATS HERE", aiChats);
//   res.json(aiChats);
// });

// router.delete("/deleteChat/:name", async (req: any, res: any) => {
//   const chatsToDelete = req.params.name;
//   console.log(req.params);
//   console.log(chatsToDelete);
//   const deletePdf = await Pdf.deleteMany({ fileName: chatsToDelete });
//   res.status(200).json({ message: "deleted" });
//   console.log(deletePdf);
// });

// module.exports = router;
// export {};
const express = require("express");
const router = express.Router();

const aiPdfController = require("../controller/aiPdfController");
const multer = require("multer");

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
  
router.post("/", upload.single('file'), aiPdfController.uploadDoc);

router.post("/question", aiPdfController.question);

router.get("/", aiPdfController.getChats);

router.delete("/:name", aiPdfController.deleteChats);

router.get("/test", (req: any, res: any) => {
  res.send("AI RUNNING");
});

module.exports = router;
