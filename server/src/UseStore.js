const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { FaissStore } = require("langchain/vectorstores/faiss");
const { OpenAI } = require("langchain/llms/openai");
const { RetrievalQAChain, loadQAStuffChain } = require("langchain/chains");
const apiKey = "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";

const QueryText = async (question) => {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: apiKey,
    temperature: 0,
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
    return res.text
  } catch (err) {
    console.log(err);
  }
};
module.exports = { QueryText };
