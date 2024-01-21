import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";
import { config } from "dotenv";
config();

const apiKey = process.env.APIKEY;

const QueryText = async (question: any) => {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: apiKey,
    // temperature: 0,
  });
  const vectorStore = await FaissStore.load("./", embeddings);

  const model = new OpenAI({ openAIApiKey: apiKey, temperature: 0 });

  const chain = new RetrievalQAChain({
    combineDocumentsChain: loadQAStuffChain(model),
    retriever: vectorStore.asRetriever(),
    returnSourceDocuments: true,
  });
  try {
    const res = await chain.call({
      query: question,
    });
    console.log("TEXT HERE12");
    // console.log("RES DATA HERE",res.text);
    return res.text;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { QueryText };
