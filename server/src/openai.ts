import { Hercai, QuestionData, DrawImageData } from "hercai";


const herc = new Hercai();
let Answer:any
let Answer2:any
const Ai1 = async (PdfText: String, question: String) => {
  let res = await herc
    .question({
      model: "v3-beta",
      content: `answer this {${question}?} based on this {${PdfText}}.  Return response in A parseable JSON format:
  
    {
      "Q": "question",
      "A": "Answer"
    }
  `,
    })
    .then((response:QuestionData) => {
      const parsableJSONres = response.reply;
      const parsedRes = JSON.parse(parsableJSONres);
      Answer = parsedRes

      // console.log("PARSE AI2", parsedRes);
      
    });
    let res2 = await herc
    .question({
      model: "v3-beta",
      content: `answer this {What is the meaning for the word Adjectives? give a detailed explanation} . Return response in the following parable JSON format:
  
    {
      "Q": "question",
      "A": "Answer"
    }
  `,
    })
    .then((response:QuestionData) => {
      const parsableJSONres = response.reply;
      const parsedRes = JSON.parse(parsableJSONres);
      Answer2 = parsedRes

      // console.log("PARSE AI2", parsedRes);
      
    });
    console.log("ANSWERS HEREE",{Answer,Answer2})

   return {Answer,Answer2}
   
};

module.exports = { Ai1 };
export {};

