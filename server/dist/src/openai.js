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
const hercai_1 = require("hercai");
const herc = new hercai_1.Hercai();
let Answer;
let Answer2;
const Ai1 = (PdfText, question) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield herc
        .question({
        model: "v3-beta",
        content: `answer this {${question}?} based on this {${PdfText}}.  Return response in A parseable JSON format:
  
    {
      "Q": "question",
      "A": "Answer"
    }
  `,
    })
        .then((response) => {
        const parsableJSONres = response.reply;
        const parsedRes = JSON.parse(parsableJSONres);
        Answer = parsedRes;
        // console.log("PARSE AI2", parsedRes);
    });
    let res2 = yield herc
        .question({
        model: "v3-beta",
        content: `answer this {What is the meaning for the word Adjectives? give a detailed explanation} . Return response in the following parable JSON format:
  
    {
      "Q": "question",
      "A": "Answer"
    }
  `,
    })
        .then((response) => {
        const parsableJSONres = response.reply;
        const parsedRes = JSON.parse(parsableJSONres);
        Answer2 = parsedRes;
        // console.log("PARSE AI2", parsedRes);
    });
    console.log("ANSWERS HEREE", { Answer, Answer2 });
    return { Answer, Answer2 };
});
module.exports = { Ai1 };
