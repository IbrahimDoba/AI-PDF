const OpenAI = require("openai");

// OPEN AI
const apiKey = "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";
const openai = new OpenAI({apiKey: apiKey});

const RunPrompt = async (PdfText:String, question:String) => {
 
  const prompt = `answer any question related to ${PdfText}. Return response in the following parable JSON format:
  
    {
      "Q": "question",
      "A": "Answer"
    }

  `
  const messages = [
    {role: "user", content: prompt},
    {role: "user", content: question},
  ]

  const res = await openai.chat.completions.create({
     messages: messages,
    temperature: 1,
    model: "gpt-3.5-turbo",
  });


  const parsableJSONres = res.choices[0].message.content
  const parsedRes = JSON.parse(parsableJSONres)
  console.log("PARSE AI",parsedRes)

  // console.log("AI ANASWER",parsedRes)
  return parsedRes
};


module.exports = { RunPrompt }