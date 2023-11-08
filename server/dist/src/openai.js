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
const OpenAI = require("openai");
// OPEN AI
const apiKey = process.env.APIKEY;
const openai = new OpenAI({ apiKey: apiKey });
const RunPrompt = (PdfText, question) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = `answer any question related to ${PdfText}. Return response in the following parable JSON format:
  
    {
      "Q": "question",
      "A": "Answer"
    }

  `;
    const messages = [
        { role: "user", content: prompt },
        { role: "user", content: question },
    ];
    const res = yield openai.chat.completions.create({
        messages: messages,
        temperature: 1,
        model: "gpt-3.5-turbo",
    });
    console.log("PARSE AI1");
    const parsableJSONres = res.choices[0].message.content;
    const parsedRes = JSON.parse(parsableJSONres);
    console.log("PARSE AI2", parsedRes);
    // console.log("AI ANASWER",parsedRes)
    return parsedRes;
});
module.exports = { RunPrompt };
